import { BinaryMessageType, BufferEncoding } from "../protocol_base.js";
export declare class BufferUtil {
    static GetType(message: Buffer): BinaryMessageType;
    static GetAck(message: Buffer): number;
    static GetSid(message: Buffer): bigint;
    static GetPayload(message: Buffer, encoding: BufferEncoding): string;
    static Transaction: {
        new (): {};
        GetChunkTxId(message: Buffer): number;
        GetChunkSeq(message: Buffer): number;
        GetChunkPayload(message: Buffer, encoding: BufferEncoding): string;
        GetTxId(message: Buffer): number;
        GetTxSize(message: Buffer): number;
        GetTxName(message: Buffer, encoding?: "utf8" | "hex"): string;
        GetFlowBehaviour(message: Buffer): number;
        GetFetchTxId(message: Buffer): number;
        GetFetchStart(message: Buffer): number;
        GetFetchEnd(message: Buffer): number;
    };
}
//# sourceMappingURL=BufferUtil.d.ts.map