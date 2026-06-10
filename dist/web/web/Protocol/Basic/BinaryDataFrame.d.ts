import { BinaryDataMessage } from "../../protocol.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export declare class BinaryDataFrame {
    static Deserialize(value: CAMPBuffer): BinaryDataMessage;
    static Serialize(sid: bigint, ack: number, payload: CAMPBuffer | null): CAMPBuffer;
}
//# sourceMappingURL=BinaryDataFrame.d.ts.map