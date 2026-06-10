import { ErrorMessage } from "../../../protocol_base.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export declare class ErrorFrame {
    static Deserialize(value: CAMPBuffer): ErrorMessage;
    static Serialize(sid: bigint, ack: number, payload: string | null): CAMPBuffer;
}
//# sourceMappingURL=ErrorFrame.d.ts.map