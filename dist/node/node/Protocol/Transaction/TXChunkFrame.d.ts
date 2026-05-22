import { TXChunkMessage } from "../../protocol.js";
export declare class TXChunkFrame {
    static Deserialize(value: Buffer): TXChunkMessage;
    static Serialize(sid: bigint, txId: number, seq: number, payload: Buffer): Buffer;
}
//# sourceMappingURL=TXChunkFrame.d.ts.map