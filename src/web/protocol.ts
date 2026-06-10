import {CAMPMessage, CAMPFrameType} from "../protocol_base.js";
import {CAMPBuffer} from "./CAMPBuffer.js";

export type BinaryDataMessage = CAMPMessage<{
    ack: number;
    payload: CAMPBuffer;
}, CAMPFrameType.BINARYDATA>;


export type TXChunkMessage = CAMPMessage<{
    txId: number;
    offset: bigint;
    payload: CAMPBuffer;
}, CAMPFrameType.TX_CHUNK>;