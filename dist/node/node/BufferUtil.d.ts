import { CAMPFrameType } from "../protocol_base.js";
export declare class BufferUtil {
    static GetType(message: Buffer): CAMPFrameType;
    static GetAck(message: Buffer): number;
    static GetSid(message: Buffer): bigint;
    static GetPayload(message: Buffer, encoding: BufferEncoding): string;
    static EndpointInfo: {
        new (): {};
        GetVersion(message: Buffer): number;
        GetFlags(message: Buffer): bigint;
    };
    static Transaction: {
        new (): {};
        GetTxId(message: Buffer): number;
        GetTxSize(message: Buffer): bigint;
        GetFlowBehaviour(message: Buffer): number;
        GetTxName(message: Buffer, encoding?: "utf8" | "hex"): string;
        GetChunkTxId(message: Buffer): number;
        GetChunkOffset(message: Buffer): bigint;
        GetChunkPayload(message: Buffer, encoding: BufferEncoding): string;
        GetFetchTxId(message: Buffer): number;
        GetFetchStart(message: Buffer): bigint;
        GetFetchEnd(message: Buffer): bigint;
    };
}
//# sourceMappingURL=BufferUtil.d.ts.map