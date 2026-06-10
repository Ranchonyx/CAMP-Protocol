import { PingMessage } from "../../../protocol_base.js";
export declare class PingPongFrame {
    static Deserialize(value: Buffer): PingMessage;
    static Serialize(sid: bigint, payload: "ping" | "pong"): Buffer;
}
//# sourceMappingURL=PingPongFrame.d.ts.map