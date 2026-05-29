export class BufferUtil {
    static GetType(message) {
        return message.readUint8(8);
    }
    static GetAck(message) {
        return message.readUInt32BE(9);
    }
    static GetSid(message) {
        return message.readBigUInt64BE(0);
    }
    static GetPayload(message, encoding) {
        return message.subarray(13).toString(encoding);
    }
    static Transaction = class {
        static GetChunkTxId(message) {
            return message.readUInt32BE(9);
        }
        static GetChunkSeq(message) {
            return message.readUInt32BE(13);
        }
        static GetChunkPayload(message, encoding) {
            return message.subarray(17).toString(encoding);
        }
        static GetTxId(message) {
            return message.readUInt32BE(13);
        }
        static GetTxSize(message) {
            return message.readInt32BE(17);
        }
        static GetTxName(message, encoding = "utf8") {
            return message.subarray(21).toString(encoding);
        }
        static GetFlowBehaviour(message) {
            return message.readUint8(13);
        }
        static GetFetchTxId(message) {
            return message.readUInt32BE(13);
        }
        static GetFetchStart(message) {
            return message.readUInt32BE(17);
        }
        static GetFetchEnd(message) {
            return message.readUInt32BE(21);
        }
    };
}
//# sourceMappingURL=BufferUtil.js.map