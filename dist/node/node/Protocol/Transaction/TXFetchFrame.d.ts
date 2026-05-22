import { TXFetchMessage } from "../../../protocol_base.js";
export declare class TXFetchFrame {
    static Deserialize(value: Buffer): TXFetchMessage;
    static Serialize(sid: bigint, ack: number, start: number, end: number): Buffer;
}
//# sourceMappingURL=TXFetchFrame.d.ts.map