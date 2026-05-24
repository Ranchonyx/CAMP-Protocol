import { TXFetchMessage } from "../../../protocol_base.js";
import { CryoBuffer } from "../../CryoBuffer.js";
export declare class TXFetchFrame {
    static Deserialize(value: CryoBuffer): TXFetchMessage;
    static Serialize(sid: bigint, ack: number, txId: number, start: number, end: number): CryoBuffer;
}
//# sourceMappingURL=TXFetchFrame.d.ts.map