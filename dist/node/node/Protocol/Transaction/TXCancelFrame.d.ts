import { TXCancelMessage } from "../../../protocol_base.js";
export declare class TXCancelFrame {
    static Deserialize(value: Buffer): TXCancelMessage;
    static Serialize(sid: bigint, ack: number, txId: number): Buffer;
}
//# sourceMappingURL=TXCancelFrame.d.ts.map