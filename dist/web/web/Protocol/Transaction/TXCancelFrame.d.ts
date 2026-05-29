import { TXCancelMessage } from "../../../protocol_base.js";
import { CryoBuffer } from "../../CryoBuffer.js";
export declare class TXCancelFrame {
    static Deserialize(value: CryoBuffer): TXCancelMessage;
    static Serialize(sid: bigint, ack: number, txId: number): CryoBuffer;
}
//# sourceMappingURL=TXCancelFrame.d.ts.map