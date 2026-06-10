import { CAMPMessage, CAMPFrameType } from "../protocol_base.js";
export type BinaryDataMessage = CAMPMessage<{
    ack: number;
    payload: Buffer;
}, CAMPFrameType.BINARYDATA>;
export type TXChunkMessage = CAMPMessage<{
    txId: number;
    offset: bigint;
    payload: Buffer;
}, CAMPFrameType.TX_CHUNK>;
//# sourceMappingURL=protocol.d.ts.map