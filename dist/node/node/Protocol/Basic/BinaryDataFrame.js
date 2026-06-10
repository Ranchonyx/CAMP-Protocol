import { CAMPFrameType, CAMP_MAX_PAYLOAD, DeserializationError, SerializationError } from "../../../protocol_base.js";
export class BinaryDataFrame {
    static Deserialize(value) {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        const payload = value.subarray(13);
        if (type !== CAMPFrameType.BINARYDATA)
            throw new DeserializationError("Attempt to deserialize a non-data binary message!");
        return {
            sid,
            ack,
            type,
            payload
        };
    }
    static Serialize(sid, ack, payload) {
        const payload_length = payload ? payload.byteLength : 4;
        if (payload_length > CAMP_MAX_PAYLOAD)
            throw new SerializationError(`Payload size of ${CAMP_MAX_PAYLOAD} bytes exceeded!`);
        const msg_buf = Buffer.alloc(8 + 4 + 1 + payload_length);
        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(CAMPFrameType.BINARYDATA, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.set(payload || Buffer.from("null", "utf-8"), 13);
        return msg_buf;
    }
}
//# sourceMappingURL=BinaryDataFrame.js.map