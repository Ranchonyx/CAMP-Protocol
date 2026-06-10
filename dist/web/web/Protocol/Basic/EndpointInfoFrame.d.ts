import { EndpointInfoMessage } from "../../../protocol_base.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export declare class EndpointInfoFrame {
    static Deserialize(value: CAMPBuffer): EndpointInfoMessage;
    static Serialize(sid: bigint, ack: number): CAMPBuffer;
}
//# sourceMappingURL=EndpointInfoFrame.d.ts.map