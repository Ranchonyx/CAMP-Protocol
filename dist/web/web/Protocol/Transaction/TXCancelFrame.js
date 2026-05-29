import { BinaryMessageType, DeserializationError } from "../../../protocol_base.js";
import { CryoBuffer } from "../../CryoBuffer.js";
export class TXCancelFrame {
    static Deserialize(value) {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        const txId = value.readUInt32BE(13);
        if (type !== BinaryMessageType.TX_CANCEL)
            throw new DeserializationError("Attempt to deserialize a non-tx_cancel message!");
        return {
            sid,
            ack,
            type,
            txId
        };
    }
    static Serialize(sid, ack, txId) {
        const msg_buf = CryoBuffer.alloc(8 + 4 + 1 + 4);
        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(BinaryMessageType.TX_CANCEL, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.writeUInt32BE(txId, 13);
        return msg_buf;
    }
}
//# sourceMappingURL=TXCancelFrame.js.map