# Abstract

Cryo is a small binary protocol for sending arbitrary messages, large data and real-time information over WebSocket.
It uses fixed frame types for acknowledgements, heartbeats, UTF-8 text, binary payloads and streamed transactions.

Each connection starts with an _ENDPOINT_INFO_ frame that announces protocol version and supported features.
Frames include a session UUID and acknowledgement counter, so both endpoints can track the state of the communication.

For large transfers, Cryo supports transactions built upon three frame types defined in **Cryo.Transaction**:

- `TX_START` begins a transfer
- `TX_CHUNK` carries chunks of binary data
- `TX_FINISH` completed the transfer

This lets large files and/or media be sent incrementally without buffering the entire data into memory at once.

### Cryo.Base

```
FrameType :=
    ENDPOINT_INFO = 255,
    BYE = 254,
    ACK = 253,
    ERROR = 252,
    PING_PONG = 251,
    UTF8DATA = 250,
    BINARYDATA = 249

CRYO_MAX_PAYLOAD :=
    16 * 1024 * 1024

ENDPOINT_INFO_FLAGS :=
    bit[0] = FEATURE_TRANSACTIONS,
    bit[1..64] = RESERVED,

- This frame is sent first upon connection to an endpoint
- It announces the capabilities and cryo version of the sending endpoint
EndpointInfoFrame := [
    sid:    bigint                  / byte[8],
    type:   0xff                    / byte[1],
    ack:    uint32                  / byte[4],
    ver:    uint32                  / byte[4],
    flags:  ENDPOINT_INFO_FLAGS     / byte[8]
]

- This frame is sent to announce a disconnect from an endpoint
- It serves so we do not need to rely on the server-side heartbeat to clean up sessions
ByeFrame := [
    sid:    bigint  / byte[8],
    type:   0xfe    / byte[1],
    ack:    uint32  / byte[4]
]

- This frame is an explicit acknowledgement to a received frame and serves
- to signal the sending endpoint, that the message has arrived
ACKFrame := [
    sid:    bigint  / byte[8],
    type:   0xfd    / byte[1],
    ack:    uint32  / byte[4],
]

- This frame indicates a protocl-level error
- It is not currently in use, but may be implemented in v2
- For example when the protocol version between two ENDPOINT_INFO frames deviates
ErrorFrame := [
    sid:        bigint  / byte[8],
    type:       0xfc    / byte[1],
    ack:        uint32  / byte[4],
    payload:    string  / byte[n..CRYO_MAX_PAYLOAD]
]

- This frame serves as a heartbeat response so
- the other endpoint knows that the connection is still alive
- If a PING_PONG with a payload of "ping" is received, you must respond with "pong"
- and vice-versa
PingPongFrame := [
    sid:        bigint      / byte[8],
    type:       0xfb        / byte[1],
    ack:        uint32      / byte[4],
    payload:    ping | pong / byte[4]
]

- This frame is a container for arbitrary UTF-8 encoded text data
Utf8DataFrame := [
    sid:        bigint  / byte[8],
    type:       0xfa    / byte[1],
    ack:        uint32  / byte[4],
    payload:    string  / byte[n..CRYO_MAX_PAYLOAD]
]

- This frame is a container for arbitrary binary data
BinaryDataFrame := [
    sid:        bigint  / byte[8],
    type:       0xf9    / byte[1],
    ack:        uint32  / byte[4],
    payload:    binary  / byte[n..CRYO_MAX_PAYLOAD]
]
```

### Cryo.Transaction

```
FrameType :=
    TX_START = 0x00,
    TX_CHUNK = 0x01,
    TX_FINISH = 0x02,
    TX_FLOW = 0x03,
    TX_PULL = 0x04

FLOW_BEHAVIOUR :=
    TX_PUSH = 0x00,
    TX_PULL = 0x01

- This frame indicates the start of a transaction
- When received, the receiver must allocate a list
- in its transaction list with the txid as key
- Transactions are named - If the name is omitted, it must be filled with "anonymous"
- size must be positive (>= 0) for explicit-length transactions, if not explicit, set to -1
TXStartFrame = [
    sid:        bigint  / byte[8],
    type:       0x00    / byte[1],
    ack:        uint32  / byte[4],
    txid:       uint32  / byte[4],
    size:       uint32  / byte[4],
    name:       string  / byte[n..CRYO_MAX_PAYLOAD]
]

- This frame is a single transaction chunk
- When received, the receiver must append it to the list in its transaction list
- keyed by the txid and append the payload to it
- seq is transmitted to ensure correct delivery order
TXChunkFrame = [
    sid:        bigint  / byte[8],
    type:       0x01    / byte[1],
    txid:       uint32  / byte[4],
    seq:        uint32  / byte[4],
    payload:    binary  / byte[n..CRYO_MAX_PAYLOAD]
]

- This frame indicates the end of a transaction
- When received, the receiver must resolve the transaction
- keyed by the txid and notify consuming code that the transaction has completed
TXFinishFrame = [
    sid:        bigint  / byte[8],
    type:       0x02    / byte[1],
    ack:        uint32  / byte[4],
    txid:       uint32  / byte[4]
]

- Sets the transaction flow control for this session
- When unset, defaults to TX_PUSH
- Cannot change a running transaction, must be sent before a transaction
TXFlowFrame = [
    sid:        bigint              / byte[8],
    type:       0x03                / byte[1],
    ack:        uint32              / byte[4],
    behaviour:  FLOW_BEHAVIOUR      / byte[1]
]

- In use only when session flow control is set to TX_PULL
- Describes a range request from chunks #start - #end
- The server will transmit those chunks and then wait for another TXFetchFrame
- If end is >= than the amount of chunks on the server, the rest of the transaction will be transmitted
TXFetchFrame = [
    sid:        bigint              / byte[8],
    type:       0x04                / byte[1],
    ack:        uint32              / byte[4],
    start:      uint32              / byte[4],
    end:        uint32              / byte[4]
]
```