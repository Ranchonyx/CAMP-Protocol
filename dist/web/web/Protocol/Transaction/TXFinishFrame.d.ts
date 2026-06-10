import { TXFinishMessage } from "../../../protocol_base.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export declare class TXFinishFrame {
    static Deserialize(value: CAMPBuffer): TXFinishMessage;
    static Serialize(sid: bigint, ack: number, txId: number): CAMPBuffer;
}
//# sourceMappingURL=TXFinishFrame.d.ts.map