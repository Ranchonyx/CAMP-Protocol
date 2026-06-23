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
    static EndpointInfo = class {
        static GetVersion(message) {
            return message.readUInt32BE(13);
        }
        static GetFlags(message) {
            return message.readBigUInt64BE(17);
        }
    };
    static Transaction = class {
        static GetTxId(message) {
            return message.readUInt32BE(13);
        }
        static GetTxSize(message) {
            return message.readBigInt64BE(17);
        }
        static GetFlowBehaviour(message) {
            return message.readUint8(25);
        }
        static GetTxName(message, encoding = "utf8") {
            return message.subarray(26).toString(encoding);
        }
        static GetChunkTxId(message) {
            return message.readUInt32BE(9);
        }
        static GetChunkOffset(message) {
            return message.readBigUInt64BE(13);
        }
        static GetChunkPayload(message, encoding) {
            return message.subarray(21).toString(encoding);
        }
        static GetFetchTxId(message) {
            return message.readUInt32BE(13);
        }
        static GetFetchStart(message) {
            return message.readBigUInt64BE(17);
        }
        static GetFetchEnd(message) {
            return message.readBigUInt64BE(25);
        }
    };
}
//# sourceMappingURL=BufferUtil.js.map