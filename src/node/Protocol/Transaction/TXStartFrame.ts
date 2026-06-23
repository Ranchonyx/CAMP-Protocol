import {
    CAMPFrameType,
    CAMP_FLOW_BEHAVIOUR,
    CAMP_MAX_PAYLOAD,
    DeserializationError, SerializationError,
    TXStartMessage
} from "../../../protocol_base.js";

export class TXStartFrame {
    public static Deserialize(value: Buffer): TXStartMessage {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        const txId = value.readUInt32BE(13);
        const byteLength = value.readBigInt64BE(17);
        const behaviour = value.readUint8(25) as CAMP_FLOW_BEHAVIOUR;
        const txName = value.subarray(26).toString("utf8");

        if (type !== CAMPFrameType.TX_START)
            throw new DeserializationError("Attempt to deserialize a non-tx_start message!");

        return {
            sid,
            ack,
            type,
            txId,
            txName,
            byteLength: byteLength >= 0n ? byteLength : null,
            behaviour
        }
    }

    public static Serialize(sid: bigint, ack: number, txId: number, name: string = "anonymous", byteLength: bigint = -1n, behaviour: CAMP_FLOW_BEHAVIOUR = CAMP_FLOW_BEHAVIOUR.TX_PUSH): Buffer {
        if (Buffer.from(name).byteLength > CAMP_MAX_PAYLOAD)
            throw new SerializationError(`Payload size of ${CAMP_MAX_PAYLOAD} bytes exceeded in parameter 'name'!`);

        const msg_buf = Buffer.alloc(8 + 1 + 4 + 4 + 8 + 1 + Buffer.from(name, "utf8").byteLength);

        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(CAMPFrameType.TX_START, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.writeUInt32BE(txId, 13);
        msg_buf.writeBigInt64BE(byteLength, 17);
        msg_buf.writeUint8(behaviour, 25);
        msg_buf.set(Buffer.from(name, "utf8"), 26);

        return msg_buf;
    }
}
