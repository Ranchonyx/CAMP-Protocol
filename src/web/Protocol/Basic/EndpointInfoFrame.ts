import {
    BinaryMessageType, CRYO_PROTOCOL_FEATURES, CRYO_PROTOCOL_VERSION,
    DeserializationError,
    EndpointInfoMessage} from "../../../protocol_base.js";

import {CryoBuffer} from "../../CryoBuffer.js";

export class EndpointInfoFrame {
    public static Deserialize(value: CryoBuffer): EndpointInfoMessage {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        const version = value.readUInt32BE(13);
        const features = value.readBigUInt64BE(17);

        if (type !== BinaryMessageType.ENDPOINT_INFO)
            throw new DeserializationError("Attempt to deserialize a non-endpoint_info message!");

        return {
            sid,
            ack,
            type,
            version,
            features
        }
    }

    public static Serialize(sid: bigint, ack: number): CryoBuffer {
        const msg_buf = CryoBuffer.alloc(8 + 1 + 4 + 4 + 8);

        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(BinaryMessageType.ENDPOINT_INFO, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.writeUInt32BE(CRYO_PROTOCOL_VERSION, 13);
        msg_buf.writeBigUInt64BE(CRYO_PROTOCOL_FEATURES, 17);

        return msg_buf;
    }
}