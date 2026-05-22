import { CRYO_FLOW_BEHAVIOUR, TXFlowMessage } from "../../../protocol_base.js";
export declare class TXFlowFrame {
    static Deserialize(value: Buffer): TXFlowMessage;
    static Serialize(sid: bigint, ack: number, behaviour: CRYO_FLOW_BEHAVIOUR): Buffer;
}
//# sourceMappingURL=TXFlowFrame.d.ts.map