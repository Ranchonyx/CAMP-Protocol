import { CAMPFrameType, CAMP_MAX_PAYLOAD, DeserializationError, SerializationError } from "../../../protocol_base.js";
import { CAMPBuffer } from "../../CAMPBuffer.js";
export class Utf8DataFrame {
    static Deserialize(value) {
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
        };
    }
    static Serialize(sid, ack, payload) {
        const payload_length = payload ? CAMPBuffer.from(payload).byteLength : 4;
        if (payload_length > CAMP_MAX_PAYLOAD)
            throw new SerializationError(`Payload size of ${CAMP_MAX_PAYLOAD} bytes exceeded!`);
        const msg_buf = CAMPBuffer.alloc(8 + 4 + 1 + payload_length);
        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(CAMPFrameType.UTF8DATA, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.write(payload || "null", 13);
        return msg_buf;
    }
}
//# sourceMappingURL=Utf8DataFrame.js.map