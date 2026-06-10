import {CAMPFrameType, DeserializationError, TXCancelMessage} from "../../../protocol_base.js";

import {CAMPBuffer} from "../../CAMPBuffer.js";

export class TXCancelFrame {
    public static Deserialize(value: CAMPBuffer): TXCancelMessage {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        const txId = value.readUInt32BE(13);

        if (type !== CAMPFrameType.TX_CANCEL)
            throw new DeserializationError("Attempt to deserialize a non-tx_cancel message!");

        return {
            sid,
            ack,
            type,
            txId
        }
    }

    public static Serialize(sid: bigint, ack: number, txId: number): CAMPBuffer {
        const msg_buf = CAMPBuffer.alloc(8 + 4 + 1 + 4);

        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(CAMPFrameType.TX_CANCEL, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.writeUInt32BE(txId, 13);

        return msg_buf;
    }
}
