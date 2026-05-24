import { BinaryMessageType, DeserializationError } from "../../../protocol_base.js";
import { CryoBuffer } from "../../CryoBuffer.js";
export class TXFetchFrame {
    static Deserialize(value) {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        const txId = value.readUInt32BE(13);
        const start = value.readUInt32BE(17);
        const end = value.readUInt32BE(21);
        if (type !== BinaryMessageType.TX_FETCH)
            throw new DeserializationError("Attempt to deserialize a non-tx_fetch message!");
        return {
            sid,
            type,
            ack,
            txId,
            start,
            end
        };
    }
    static Serialize(sid, ack, txId, start, end) {
        const msg_buf = CryoBuffer.alloc(8 + 1 + 4 + 4 + 4 + 4);
        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(BinaryMessageType.TX_FETCH, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.writeUInt32BE(txId, 13);
        msg_buf.writeUInt32BE(start, 17);
        msg_buf.writeUInt32BE(end, 21);
        return msg_buf;
    }
}
//# sourceMappingURL=TXFetchFrame.js.map