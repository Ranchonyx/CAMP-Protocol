import { CAMP_FLOW_BEHAVIOUR, TXStartMessage } from "../../../protocol_base.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export declare class TXStartFrame {
    static Deserialize(value: CAMPBuffer): TXStartMessage;
    static Serialize(sid: bigint, ack: number, txId: number, name?: string, byteLength?: bigint, behaviour?: CAMP_FLOW_BEHAVIOUR): CAMPBuffer;
}
//# sourceMappingURL=TXStartFrame.d.ts.map