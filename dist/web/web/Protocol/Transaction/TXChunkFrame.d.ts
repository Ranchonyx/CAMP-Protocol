import { TXChunkMessage } from "../../protocol.js";
import { CryoBuffer } from "../../CryoBuffer.js";
export declare class TXChunkFrame {
    static Deserialize(value: CryoBuffer): TXChunkMessage;
    static Serialize(sid: bigint, txId: number, seq: number, payload: CryoBuffer): CryoBuffer;
}
//# sourceMappingURL=TXChunkFrame.d.ts.map