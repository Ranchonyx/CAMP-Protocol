import { TXStartMessage } from "../../../protocol_base.js";
import { CryoBuffer } from "../../CryoBuffer.js";
export declare class TXStartFrame {
    static Deserialize(value: CryoBuffer): TXStartMessage;
    static Serialize(sid: bigint, ack: number, txId: number, name?: string, byteLength?: number): CryoBuffer;
}
//# sourceMappingURL=TXStartFrame.d.ts.map