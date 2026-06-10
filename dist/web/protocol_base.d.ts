export declare const CAMP_MAX_PAYLOAD: number;
export declare const CAMP_PROTOCOL_VERSION = 1;
export declare const CAMP_FEATURE_MASK_TRANSACTION = 1n;
export declare const CAMP_PROTOCOL_FEATURES: bigint;
export declare enum CAMP_FLOW_BEHAVIOUR {
    TX_PUSH = 0,
    TX_PULL = 1
}
export declare function CAMPNewId(): bigint;
export declare function CAMPHasFeatureFlag(flags: bigint, flag: bigint): boolean;
export declare class DeserializationError extends Error {
    constructor(pMessage: string);
}
export declare class SerializationError extends Error {
    constructor(pMessage: string);
}
export declare enum CAMPFrameType {
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
    TX_FETCH = 3,
    TX_CANCEL = 4
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
export type TXCancelMessage = CAMPMessage<{
    ack: number;
    txId: number;
}, CAMPFrameType.TX_CANCEL>;
export type ErrorMessage = CAMPMessage<{
    ack: number;
    payload: string;
}, CAMPFrameType.ERROR>;
//# sourceMappingURL=protocol_base.d.ts.map