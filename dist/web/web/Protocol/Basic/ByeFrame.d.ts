import { ByeMessage } from "../../../protocol_base.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export declare class ByeFrame {
    static Deserialize(value: CAMPBuffer): ByeMessage;
    static Serialize(sid: bigint, ack: number, reason: string | null): CAMPBuffer;
}
//# sourceMappingURL=ByeFrame.d.ts.map