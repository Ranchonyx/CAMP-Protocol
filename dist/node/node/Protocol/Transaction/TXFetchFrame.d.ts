import { TXFetchMessage } from "../../../protocol_base.js";
export declare class TXFetchFrame {
    static Deserialize(value: Buffer): TXFetchMessage;
    static Serialize(sid: bigint, ack: number, txId: number, start: bigint, end: bigint): Buffer;
}
//# sourceMappingURL=TXFetchFrame.d.ts.map