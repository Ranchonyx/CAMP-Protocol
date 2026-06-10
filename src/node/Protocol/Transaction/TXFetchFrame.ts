import {CAMPFrameType, DeserializationError, TXFetchMessage} from "../../../protocol_base.js";

export class TXFetchFrame {
    public static Deserialize(value: Buffer): TXFetchMessage {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        const txId = value.readUInt32BE(13)
        const start = value.readBigUInt64BE(17);
        const end = value.readBigUInt64BE(25);

        if (type !== CAMPFrameType.TX_FETCH)
            throw new DeserializationError("Attempt to deserialize a non-tx_fetch message!");

        return {
            sid,
            ack,
            txId,
            type,
            start,
            end
        }
    }

    public static Serialize(sid: bigint, ack: number, txId: number, start: bigint, end: bigint): Buffer {
        const msg_buf = Buffer.alloc(8 + 1 + 4 + 4 + 8 + 8);

        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(CAMPFrameType.TX_FETCH, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.writeUInt32BE(txId, 13)
        msg_buf.writeBigUInt64BE(start, 17);
        msg_buf.writeBigUInt64BE(end, 25);

        return msg_buf;
    }
}
