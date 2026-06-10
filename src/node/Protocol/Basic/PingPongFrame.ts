import {CAMPFrameType, DeserializationError, PingMessage} from "../../../protocol_base.js";


export class PingPongFrame {
    public static Deserialize(value: Buffer): PingMessage {
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
        }
    }

    public static Serialize(sid: bigint, payload: "ping" | "pong"): Buffer {
        const msg_buf = Buffer.alloc(8 + 1 + 4);

        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(CAMPFrameType.PING_PONG, 8);
        msg_buf.write(payload, 9);

        return msg_buf;
    }
}