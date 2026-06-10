import { CAMPFrameType, CAMP_MAX_PAYLOAD, DeserializationError, SerializationError } from "../../../protocol_base.js";
export class TXChunkFrame {
    static Deserialize(value) {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const txId = value.readUInt32BE(9);
        const offset = value.readBigUInt64BE(13);
        const payload = value.subarray(21);
        if (type !== CAMPFrameType.TX_CHUNK)
            throw new DeserializationError("Attempt to deserialize a non-tx_chunk message!");
        return {
            sid,
            type,
            txId,
            offset,
            payload
        };
    }
    static Serialize(sid, txId, offset, payload) {
        if (payload.byteLength > CAMP_MAX_PAYLOAD)
            throw new SerializationError(`Payload size of ${CAMP_MAX_PAYLOAD} bytes exceeded!`);
        const msg_buf = Buffer.alloc(8 + 1 + 4 + 8 + payload.byteLength);
        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(CAMPFrameType.TX_CHUNK, 8);
        msg_buf.writeUInt32BE(txId, 9);
        msg_buf.writeBigUInt64BE(offset, 13);
        msg_buf.set(payload, 21);
        return msg_buf;
    }
}
//# sourceMappingURL=TXChunkFrame.js.map