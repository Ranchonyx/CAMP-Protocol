import { TXChunkMessage } from "../../protocol.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export declare class TXChunkFrame {
    static Deserialize(value: CAMPBuffer): TXChunkMessage;
    static Serialize(sid: bigint, txId: number, offset: bigint, payload: CAMPBuffer): CAMPBuffer;
}
//# sourceMappingURL=TXChunkFrame.d.ts.map