import {
    CAMPFrameType, CAMP_PROTOCOL_FEATURES, CAMP_PROTOCOL_VERSION,
    DeserializationError,
    EndpointInfoMessage} from "../../../protocol_base.js";


export class EndpointInfoFrame {
    public static Deserialize(value: Buffer): EndpointInfoMessage {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        const version = value.readUInt32BE(13);
        const features = value.readBigUInt64BE(17);

        if (type !== CAMPFrameType.ENDPOINT_INFO)
            throw new DeserializationError("Attempt to deserialize a non-endpoint_info message!");

        return {
            sid,
            ack,
            type,
            version,
            features
        }
    }

    public static Serialize(sid: bigint, ack: number): Buffer {
        const msg_buf = Buffer.alloc(8 + 1 + 4 + 4 + 8);

        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(CAMPFrameType.ENDPOINT_INFO, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.writeUInt32BE(CAMP_PROTOCOL_VERSION, 13);
        msg_buf.writeBigUInt64BE(CAMP_PROTOCOL_FEATURES, 17);

        return msg_buf;
    }
}