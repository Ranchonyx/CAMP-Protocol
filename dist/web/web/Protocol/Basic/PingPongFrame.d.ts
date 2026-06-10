import { PingMessage } from "../../../protocol_base.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export declare class PingPongFrame {
    static Deserialize(value: CAMPBuffer): PingMessage;
    static Serialize(sid: bigint, payload: "ping" | "pong"): CAMPBuffer;
}
//# sourceMappingURL=PingPongFrame.d.ts.map