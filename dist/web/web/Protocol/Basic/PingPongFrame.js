import { CAMPFrameType, DeserializationError } from "../../../protocol_base.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export class PingPongFrame {
    static Deserialize(value) {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const payload = value.subarray(9).toString("utf8");
        if (type !== CAMPFrameType.PING_PONG)
            throw new DeserializationError("Attempt to deserialize a non-ping_pong binary message!");
        if (!(payload === "ping" || payload === "pong"))
            throw new DeserializationError(`Invalid payload ${payload} in ping_pong binary message!`);
        return {
            sid,
            type,
            payload
        };
    }
    static Serialize(sid, payload) {
        const msg_buf = CAMPBuffer.alloc(8 + 1 + 4);
        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(CAMPFrameType.PING_PONG, 8);
        msg_buf.write(payload, 9);
        return msg_buf;
    }
}
//# sourceMappingURL=PingPongFrame.js.map