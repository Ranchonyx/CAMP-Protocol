import {
    CAMPFrameType,
    DeserializationError,
    CAMP_MAX_PAYLOAD, SerializationError, ByeMessage
} from "../../../protocol_base.js";

export class ByeFrame {
    public static Deserialize(value: Buffer): ByeMessage {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        const reason = value.subarray(13).toString("utf8");

        if (type !== CAMPFrameType.BYE)
            throw new DeserializationError("Attempt to deserialize a non-bye message!");

        return {
            sid,
            ack,
            type,
            reason
        }
    }

    public static Serialize(sid: bigint, ack: number, reason: string | null): Buffer {
        const reasonLen = reason?.length ? reason.length : 10;
        if (reasonLen > CAMP_MAX_PAYLOAD)
            throw new SerializationError(`Payload size of ${CAMP_MAX_PAYLOAD} bytes exceeded!`);

        const msg_buf = Buffer.alloc(8 + 1 + 4 + reasonLen);

        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(CAMPFrameType.BYE, 8);
        msg_buf.writeUInt32BE(ack, 9);

        msg_buf.write(reason || "disconnect", 13);

        return msg_buf;
    }
}