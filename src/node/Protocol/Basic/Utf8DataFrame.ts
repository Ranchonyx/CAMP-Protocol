import {
    CAMPFrameType,
    CAMP_MAX_PAYLOAD,
    DeserializationError, SerializationError,
    UTF8DataMessage} from "../../../protocol_base.js";


export class Utf8DataFrame {
    public static Deserialize(value: Buffer): UTF8DataMessage {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        const payload = value.subarray(13).toString("utf8");

        if (type !== CAMPFrameType.UTF8DATA)
            throw new DeserializationError("Attempt to deserialize a non-data utf8 message!");

        return {
            sid,
            ack,
            type,
            payload
        }
    }

    public static Serialize(sid: bigint, ack: number, payload: string | null): Buffer {
        const payload_length = payload ? Buffer.from(payload).byteLength : 4;
        if (payload_length > CAMP_MAX_PAYLOAD)
            throw new SerializationError(`Payload size of ${CAMP_MAX_PAYLOAD} bytes exceeded!`);

        const msg_buf = Buffer.alloc(8 + 4 + 1 + payload_length);

        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(CAMPFrameType.UTF8DATA, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.write(payload || "null", 13);

        return msg_buf;
    }
}