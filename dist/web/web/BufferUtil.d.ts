import { CryoBuffer } from "./CryoBuffer.js";
import { BinaryMessageType, BufferEncoding } from "../protocol_base.js";
export declare class BufferUtil {
    static GetType(message: CryoBuffer): BinaryMessageType;
    static GetAck(message: CryoBuffer): number;
    static GetSid(message: CryoBuffer): bigint;
    static GetPayload(message: CryoBuffer, encoding: BufferEncoding): string;
    static Transaction: {
        new (): {};
        GetChunkTxId(message: CryoBuffer): number;
        GetChunkSeq(message: CryoBuffer): number;
        GetChunkPayload(message: CryoBuffer, encoding: BufferEncoding): string;
        GetTxId(message: CryoBuffer): number;
        GetTxSize(message: CryoBuffer): number;
        GetTxName(message: CryoBuffer, encoding?: "utf8" | "hex"): string;
        GetFlowBehaviour(message: CryoBuffer): number;
        GetFetchTxId(message: CryoBuffer): number;
        GetFetchStart(message: CryoBuffer): number;
        GetFetchEnd(message: CryoBuffer): number;
    };
}
//# sourceMappingURL=BufferUtil.d.ts.map