import {AckMessage, CAMPFrameType, DeserializationError} from "../../../protocol_base.js";


export class ACKFrame {
    public static Deserialize(value: Buffer): AckMessage {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);

        if (type !== CAMPFrameType.ACK)
            throw new DeserializationError("Attempt to deserialize a non-ack binary message!");

        return {
            sid,
            ack,
            type
        }
    }

    public static Serialize(sid: bigint, ack: number): Buffer {
        const msg_buf = Buffer.alloc(8 + 4 + 1);

        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(CAMPFrameType.ACK, 8);
        msg_buf.writeUInt32BE(ack, 9);

        return msg_buf;
    }
}