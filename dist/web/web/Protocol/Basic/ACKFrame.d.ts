import { AckMessage } from "../../../protocol_base.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export declare class ACKFrame {
    static Deserialize(value: CAMPBuffer): AckMessage;
    static Serialize(sid: bigint, ack: number): CAMPBuffer;
}
//# sourceMappingURL=ACKFrame.d.ts.map