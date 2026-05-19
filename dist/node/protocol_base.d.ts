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
    TX_FLOW = 3
}
export declare enum TXFlowBehaviour {
    TX_PUSH = 0,
    TX_PULL = 1
}
export type BufferEncoding = "utf8" | "hex";
export type BinaryMessage<T, U extends BinaryMessageType> = {
    sid: bigint;
    type: U;
} & T;
export type EndpointInfoMessage = BinaryMessage<{
    ack: number;
    version: number;
    features: bigint;
}, BinaryMessageType.ENDPOINT_INFO>;
export type ByeMessage = BinaryMessage<{
    ack: number;
    reason: string;
}, BinaryMessageType.BYE>;
export type AckMessage = BinaryMessage<{
    ack: number;
}, BinaryMessageType.ACK>;
export type PingMessage = BinaryMessage<{
    ack: number;
    payload: "ping" | "pong";
}, BinaryMessageType.PING_PONG>;
export type UTF8DataMessage = BinaryMessage<{
    ack: number;
    payload: string;
}, BinaryMessageType.UTF8DATA>;
export type TXStartMessage = BinaryMessage<{
    ack: number;
    txId: number;
    txName: string;
}, BinaryMessageType.TX_START>;
export type TXFinishMessage = BinaryMessage<{
    ack: number;
    txId: number;
}, BinaryMessageType.TX_FINISH>;
export type TXFlowMessage = BinaryMessage<{
    ack: number;
    behaviour: TXFlowBehaviour;
}, BinaryMessageType.TX_FLOW>;
export type ErrorMessage = BinaryMessage<{
    ack: number;
    payload: string;
}, BinaryMessageType.ERROR>;
//# sourceMappingURL=protocol_base.d.ts.map