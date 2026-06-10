import { TXCancelMessage } from "../../../protocol_base.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export declare class TXCancelFrame {
    static Deserialize(value: CAMPBuffer): TXCancelMessage;
    static Serialize(sid: bigint, ack: number, txId: number): CAMPBuffer;
}
//# sourceMappingURL=TXCancelFrame.d.ts.map