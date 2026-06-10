import { CAMP_FLOW_BEHAVIOUR, TXStartMessage } from "../../../protocol_base.js";
export declare class TXStartFrame {
    static Deserialize(value: Buffer): TXStartMessage;
    static Serialize(sid: bigint, ack: number, txId: number, name?: string, byteLength?: bigint, behaviour?: CAMP_FLOW_BEHAVIOUR): Buffer;
}
//# sourceMappingURL=TXStartFrame.d.ts.map