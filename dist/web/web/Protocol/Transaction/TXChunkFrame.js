import { BinaryMessageType, CRYO_MAX_PAYLOAD, DeserializationError, SerializationError } from "../../../protocol_base.js";
import { CryoBuffer } from "../../CryoBuffer.js";
export class TXChunkFrame {
    static Deserialize(value) {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const txId = value.readUInt32BE(9);
        const seq = value.readUInt32BE(13);
        const payload = value.subarray(17);
        if (type !== BinaryMessageType.TX_CHUNK)
            throw new DeserializationError("Attempt to deserialize a non-tx_chunk message!");
        return {
            sid,
            type,
            txId,
            seq,
            payload
        };
    }
    static Serialize(sid, txId, seq, payload) {
        if (payload.byteLength > CRYO_MAX_PAYLOAD)
            throw new SerializationError(`Payload size of ${CRYO_MAX_PAYLOAD} bytes exceeded!`);
        const msg_buf = CryoBuffer.alloc(8 + 1 + 4 + payload.byteLength);
        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(BinaryMessageType.TX_CHUNK, 8);
        msg_buf.writeUInt32BE(seq, 13);
        msg_buf.set(payload, 17);
        return msg_buf;
    }
}
//# sourceMappingURL=TXChunkFrame.js.map