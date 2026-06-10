export const CAMP_MAX_PAYLOAD = 1 * 1024 * 1024;
export const CAMP_PROTOCOL_VERSION = 1;

export const CAMP_FEATURE_MASK_TRANSACTION = 1n;

export const CAMP_PROTOCOL_FEATURES: bigint =
    0b0000000000000000000000000000000000000000000000000000000000000000n |
    CAMP_FEATURE_MASK_TRANSACTION
;

export enum CAMP_FLOW_BEHAVIOUR {
    TX_PUSH = 0x00,
    TX_PULL = 0x01
}

export function CAMPNewId(): bigint {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);

    let value = 0n;
    for (const byte of bytes)
        value = (value << 8n) | BigInt(byte);

    return value;
}

export function CAMPHasFeatureFlag(flags: bigint, flag: bigint): boolean {
    if (flag === 0n)
        return false;

    return (flags & flag) === flag;
}

export class DeserializationError extends Error {
    public constructor(pMessage: string) {
        super(`CAMP Frame deserialization failed: ${pMessage}`);
        Object.setPrototypeOf(this, DeserializationError.prototype);
    }
}

export class SerializationError extends Error {
    public constructor(pMessage: string) {
        super(`CAMP Frame serialization failed: ${pMessage}`);
        Object.setPrototypeOf(this, SerializationError.prototype);
    }
}

export enum CAMPFrameType {
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
    TX_FETCH = 0x03,
    TX_CANCEL = 0x04
}

export type CAMPBufferEncoding = "utf8" | "hex";

export type CAMPMessage<T, U extends CAMPFrameType> = {
    sid: bigint;
    type: U;
} & T;

export type EndpointInfoMessage = CAMPMessage<{
    ack: number;
    version: number;
    features: bigint;
}, CAMPFrameType.ENDPOINT_INFO>;

export type ByeMessage = CAMPMessage<{
    ack: number;
    reason: string;
}, CAMPFrameType.BYE>;

export type AckMessage = CAMPMessage<{
    ack: number;
}, CAMPFrameType.ACK>;

export type PingMessage = CAMPMessage<{
    payload: "ping" | "pong";
}, CAMPFrameType.PING_PONG>;

export type UTF8DataMessage = CAMPMessage<{
    ack: number;
    payload: string;
}, CAMPFrameType.UTF8DATA>;

export type TXStartMessage = CAMPMessage<{
    ack: number;
    txId: number;
    txName: string;
    byteLength: bigint | null;
    behaviour: CAMP_FLOW_BEHAVIOUR;
}, CAMPFrameType.TX_START>;

export type TXFinishMessage = CAMPMessage<{
    ack: number;
    txId: number;
}, CAMPFrameType.TX_FINISH>;

export type TXFetchMessage = CAMPMessage<{
    ack: number;
    txId: number;
    start: bigint;
    end: bigint;
}, CAMPFrameType.TX_FETCH>;

export type TXCancelMessage = CAMPMessage<{ ack: number, txId: number }, CAMPFrameType.TX_CANCEL>;

export type ErrorMessage = CAMPMessage<{
    ack: number;
    payload: string;
}, CAMPFrameType.ERROR>;