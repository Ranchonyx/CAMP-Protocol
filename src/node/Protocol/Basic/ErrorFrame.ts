import {
    CAMPFrameType,
    ErrorMessage,
    DeserializationError,
    CAMP_MAX_PAYLOAD, SerializationError
} from "../../../protocol_base.js";


export class ErrorFrame {
    public static Deserialize(value: Buffer): ErrorMessage {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        const payload = value.subarray(13).toString("utf8");

        if (type !== CAMPFrameType.ERROR)
            throw new DeserializationError("Attempt to deserialize a non-error message!");

        return {
            sid,
            ack,
            type,
            payload
        }
    }

    public static Serialize(sid: bigint, ack: number, payload: string | null): Buffer {
        const err_len = payload?.length ? payload.length : 13;
        if (err_len > CAMP_MAX_PAYLOAD)
            throw new SerializationError(`Payload size of ${CAMP_MAX_PAYLOAD} bytes exceeded!`);

        const msg_buf = Buffer.alloc(8 + 4 + 1 + err_len);

        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(CAMPFrameType.ERROR, 8);
        msg_buf.writeUInt32BE(ack, 9);

        msg_buf.write(payload || "unknown_error", 13);

        return msg_buf;
    }
}