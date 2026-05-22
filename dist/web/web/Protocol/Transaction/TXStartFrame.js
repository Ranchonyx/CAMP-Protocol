import { BinaryMessageType, DeserializationError } from "../../../protocol_base.js";
import { CryoBuffer } from "../../CryoBuffer.js";
export class TXStartFrame {
    static Deserialize(value) {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        const txId = value.readUInt32BE(13);
        const byteLength = value.readUInt32BE(17);
        const txName = value.subarray(21).toString("utf8");
        if (type !== BinaryMessageType.TX_START)
            throw new DeserializationError("Attempt to deserialize a non-tx_start message!");
        return {
            sid,
            ack,
            type,
            txId,
            txName,
            byteLength: byteLength >= 0 ? byteLength : null
        };
    }
    static Serialize(sid, ack, txId, name = "anonymous", byteLength = -1) {
        const msg_buf = CryoBuffer.alloc(8 + 4 + 1 + 4 + CryoBuffer.from(name, "utf8").byteLength);
        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(BinaryMessageType.TX_START, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.writeUInt32BE(txId, 13);
        msg_buf.writeUInt32BE(byteLength, 17);
        msg_buf.set(CryoBuffer.from(name, "utf8"), 21);
        return msg_buf;
    }
}
//# sourceMappingURL=TXStartFrame.js.map