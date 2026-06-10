import { UTF8DataMessage } from "../../../protocol_base.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export declare class Utf8DataFrame {
    static Deserialize(value: CAMPBuffer): UTF8DataMessage;
    static Serialize(sid: bigint, ack: number, payload: string | null): CAMPBuffer;
}
//# sourceMappingURL=Utf8DataFrame.d.ts.map