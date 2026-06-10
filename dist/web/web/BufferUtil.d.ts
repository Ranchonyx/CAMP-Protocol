import { CAMPBuffer } from "./CAMPBuffer.js";
import { CAMPFrameType, CAMPBufferEncoding } from "../protocol_base.js";
export declare class BufferUtil {
    static GetType(message: CAMPBuffer): CAMPFrameType;
    static GetAck(message: CAMPBuffer): number;
    static GetSid(message: CAMPBuffer): bigint;
    static GetPayload(message: CAMPBuffer, encoding: CAMPBufferEncoding): string;
    static Transaction: {
        new (): {};
        GetChunkTxId(message: CAMPBuffer): number;
        GetChunkSeq(message: CAMPBuffer): number;
        GetChunkPayload(message: CAMPBuffer, encoding: CAMPBufferEncoding): string;
        GetTxId(message: CAMPBuffer): number;
        GetTxSize(message: CAMPBuffer): number;
        GetTxName(message: CAMPBuffer, encoding?: "utf8" | "hex"): string;
        GetFlowBehaviour(message: CAMPBuffer): number;
        GetFetchTxId(message: CAMPBuffer): number;
        GetFetchStart(message: CAMPBuffer): number;
        GetFetchEnd(message: CAMPBuffer): number;
    };
}
//# sourceMappingURL=BufferUtil.d.ts.map