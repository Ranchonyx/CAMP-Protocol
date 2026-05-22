import {BinaryMessageType, DeserializationError, CRYO_FLOW_BEHAVIOUR, TXFlowMessage} from "../../../protocol_base.js";

export class TXFlowFrame {
    public static Deserialize(value: Buffer): TXFlowMessage {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);

        if (type !== BinaryMessageType.TX_FLOW)
            throw new DeserializationError("Attempt to deserialize a non-tx_flow message!");

        const behaviour = value.readUint8(13) as CRYO_FLOW_BEHAVIOUR;
        if (!(behaviour === CRYO_FLOW_BEHAVIOUR.TX_PUSH || behaviour === CRYO_FLOW_BEHAVIOUR.TX_PULL))
            throw new DeserializationError(`Invalid behaviour ${behaviour} in tx_flow message!`);

        return {
            sid,
            ack,
            type,
            behaviour
        }
    }

    public static Serialize(sid: bigint, ack: number, behaviour: CRYO_FLOW_BEHAVIOUR): Buffer {
        const msg_buf = Buffer.alloc(8 + 1 + 4 + 1);

        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(BinaryMessageType.TX_FLOW, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.writeUint8(behaviour, 13);

        return msg_buf;
    }
}