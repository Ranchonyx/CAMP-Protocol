import {CryoMessage, BinaryMessageType} from "../protocol_base.js";

export type BinaryDataMessage = CryoMessage<{
    ack: number;
    payload: Buffer;
}, BinaryMessageType.BINARYDATA>;


export type TXChunkMessage = CryoMessage<{
    txId: number;
    seq: number;
    payload: Buffer;
}, BinaryMessageType.TX_CHUNK>;
