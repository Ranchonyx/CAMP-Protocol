import { CAMPBuffer } from "./CAMPBuffer.js";
import { CAMPFrameType, CAMPBufferEncoding } from "../protocol_base.js";
export declare class BufferUtil {
    static GetType(message: CAMPBuffer): CAMPFrameType;
    static GetAck(message: CAMPBuffer): number;
    static GetSid(message: CAMPBuffer): bigint;
    static GetPayload(message: CAMPBuffer, encoding: CAMPBufferEncoding): string;
    static EndpointInfo: {
        new (): {};
        GetVersion(message: CAMPBuffer): number;
        GetFlags(message: CAMPBuffer): bigint;
    };
    static Transaction: {
        new (): {};
        GetTxId(message: CAMPBuffer): number;
        GetTxSize(message: CAMPBuffer): bigint;
        GetFlowBehaviour(message: CAMPBuffer): number;
        GetTxName(message: CAMPBuffer, encoding?: "utf8" | "hex"): string;
        GetChunkTxId(message: CAMPBuffer): number;
        GetChunkOffset(message: CAMPBuffer): bigint;
        GetChunkPayload(message: CAMPBuffer, encoding: CAMPBufferEncoding): string;
        GetFetchTxId(message: CAMPBuffer): number;
        GetFetchStart(message: CAMPBuffer): bigint;
        GetFetchEnd(message: CAMPBuffer): bigint;
    };
}
//# sourceMappingURL=BufferUtil.d.ts.map