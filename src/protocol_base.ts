export const CRYO_MAX_PAYLOAD = 16 * 1024 * 1024;
export const CRYO_PROTOCOL_VERSION = 1;

export const CRYO_FEATURE_MASK_TRANSACTION = 1n;

export const CRYO_PROTOCOL_FEATURES: bigint =
    0b0000000000000000000000000000000000000000000000000000000000000000n |
    CRYO_FEATURE_MASK_TRANSACTION
;

export function cryoNewId(): bigint {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);

    let value = 0n;
    for (const byte of bytes)
        value = (value << 8n) | BigInt(byte);

    return value;
}

export function cryoHasFeatureFlag(flags: bigint, flag: bigint): boolean {
    if (flag === 0n)
        return false;

    return (flags & flag) === flag;
}

export class DeserializationError extends Error {
    public constructor(pMessage: string) {
        super(`Frame deserialization failed: ${pMessage}`);
        Object.setPrototypeOf(this, DeserializationError.prototype);
    }
}

export class SerializationError extends Error {
    public constructor(pMessage: string) {
        super(`Frame serialization failed: ${pMessage}`);
        Object.setPrototypeOf(this, SerializationError.prototype);
    }
}

export enum BinaryMessageType {
    ENDPOINT_INFO = 255,
    BYE = 254,
    ACK = 253,
    ERROR = 252,
    PING_PONG = 251,
    UTF8DATA = 250,
    BINARYDATA = 249,

    TX_START = 0x00,
    TX_CHUNK = 0x01,
    TX_FINISH = 0x02,
    TX_FLOW = 0x03,
    TX_FETCH = 0x04
}

export enum CRYO_FLOW_BEHAVIOUR {
    TX_PUSH = 0x00,
    TX_PULL = 0x01
}

export type BufferEncoding = "utf8" | "hex";

export type CryoMessage<T, U extends BinaryMessageType> = {
    sid: bigint;
    type: U;
} & T;

export type EndpointInfoMessage = CryoMessage<{
    ack: number;
    version: number;
    features: bigint;
}, BinaryMessageType.ENDPOINT_INFO>;

export type ByeMessage = CryoMessage<{
    ack: number;
    reason: string;
}, BinaryMessageType.BYE>;

export type AckMessage = CryoMessage<{
    ack: number;
}, BinaryMessageType.ACK>;

export type PingMessage = CryoMessage<{
    ack: number;
    payload: "ping" | "pong";
}, BinaryMessageType.PING_PONG>;

export type UTF8DataMessage = CryoMessage<{
    ack: number;
    payload: string;
}, BinaryMessageType.UTF8DATA>;

export type TXStartMessage = CryoMessage<{
    ack: number;
    txId: number;
    txName: string;
    byteLength: number | null;
}, BinaryMessageType.TX_START>;

export type TXFinishMessage = CryoMessage<{
    ack: number;
    txId: number;
}, BinaryMessageType.TX_FINISH>;

export type TXFlowMessage = CryoMessage<{
    ack: number;
    behaviour: CRYO_FLOW_BEHAVIOUR
}, BinaryMessageType.TX_FLOW>;

export type TXFetchMessage = CryoMessage<{
    ack: number;
    start: number;
    end: number;
}, BinaryMessageType.TX_FETCH>;

export type ErrorMessage = CryoMessage<{
    ack: number;
    payload: string;
}, BinaryMessageType.ERROR>;