import { BinaryMessageType, DeserializationError, CRYO_FLOW_BEHAVIOUR } from "../../../protocol_base.js";
import { CryoBuffer } from "../../CryoBuffer.js";
export class TXFlowFrame {
    static Deserialize(value) {
        const sid = value.readBigUInt64BE(0);
        const type = value.readUint8(8);
        const ack = value.readUInt32BE(9);
        if (type !== BinaryMessageType.TX_FLOW)
            throw new DeserializationError("Attempt to deserialize a non-tx_flow message!");
        const behaviour = value.readUint8(10);
        if (!(behaviour === CRYO_FLOW_BEHAVIOUR.TX_PUSH || behaviour === CRYO_FLOW_BEHAVIOUR.TX_PULL))
            throw new DeserializationError(`Invalid behaviour ${behaviour} in tx_flow message!`);
        return {
            sid,
            ack,
            type,
            behaviour
        };
    }
    static Serialize(sid, ack, behaviour) {
        const msg_buf = CryoBuffer.alloc(8 + 4 + 1 + 1);
        msg_buf.writeBigUInt64BE(sid, 0);
        msg_buf.writeUint8(BinaryMessageType.TX_FLOW, 8);
        msg_buf.writeUInt32BE(ack, 9);
        msg_buf.writeUint8(behaviour, 10);
        return msg_buf;
    }
}
//# sourceMappingURL=TXFlowFrame.js.map