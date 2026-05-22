import { CryoMessage, BinaryMessageType } from "../protocol_base.js";
import { CryoBuffer } from "./CryoBuffer.js";
export type BinaryDataMessage = CryoMessage<{
    ack: number;
    payload: CryoBuffer;
}, BinaryMessageType.BINARYDATA>;
export type TXChunkMessage = CryoMessage<{
    txId: number;
    seq: number;
    payload: CryoBuffer;
}, BinaryMessageType.TX_CHUNK>;
//# sourceMappingURL=protocol.d.ts.map