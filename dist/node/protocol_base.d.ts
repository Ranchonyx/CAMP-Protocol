export declare const CRYO_MAX_PAYLOAD: number;
export declare const CRYO_PROTOCOL_VERSION = 1;
export declare const CRYO_FEATURE_MASK_TRANSACTION = 1n;
export declare const CRYO_PROTOCOL_FEATURES: bigint;
export declare function cryoNewId(): bigint;
export declare function cryoHasFeatureFlag(flags: bigint, flag: bigint): boolean;
export declare class DeserializationError extends Error {
    constructor(pMessage: string);
}
export declare class SerializationError extends Error {
    constructor(pMessage: string);
}
export declare enum BinaryMessageType {
    ENDPOINT_INFO = 255,
    BYE = 254,
    ACK = 253,
    ERROR = 252,
    PING_PONG = 251,
    UTF8DATA = 250,
    BINARYDATA = 249,
    TX_START = 0,
    TX_CHUNK = 1,
    TX_FINISH = 2,
    TX_FLOW = 3,
    TX_FETCH = 4
}
export declare enum CRYO_FLOW_BEHAVIOUR {
    TX_PUSH = 0,
    TX_PULL = 1
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
    behaviour: CRYO_FLOW_BEHAVIOUR;
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
//# sourceMappingURL=protocol_base.d.ts.map