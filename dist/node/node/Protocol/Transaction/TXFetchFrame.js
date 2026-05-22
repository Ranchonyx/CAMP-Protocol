import { BinaryMessageType, DeserializationError } from "../../../protocol_base.js";
export class TXFetchFrame {
    static Deserialize(value) {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        const start = value.readUInt32BE(13);
        const end = value.readUInt32BE(17);
        if (type !== BinaryMessageType.TX_FETCH)
            throw new DeserializationError("Attempt to deserialize a non-tx_fetch message!");
        return {
            sid,
            ack,
            type,
            start,
            end
        };
    }
    static Serialize(sid, ack, start, end) {
        const msg_buf = Buffer.alloc(8 + 1 + 4 + 4 + 4);
        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(BinaryMessageType.TX_FETCH, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.writeUInt32BE(start, 13);
        msg_buf.writeUInt32BE(end, 17);
        return msg_buf;
    }
}
//# sourceMappingURL=TXFetchFrame.js.map