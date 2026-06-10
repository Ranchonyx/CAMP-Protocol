import { TXFetchMessage } from "../../../protocol_base.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export declare class TXFetchFrame {
    static Deserialize(value: CAMPBuffer): TXFetchMessage;
    static Serialize(sid: bigint, ack: number, txId: number, start: bigint, end: bigint): CAMPBuffer;
}
//# sourceMappingURL=TXFetchFrame.d.ts.map