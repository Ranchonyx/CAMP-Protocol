export class BufferUtil {
    static GetType(message) {
        const type = message.readUint8(16);
        if (type > 0xff)
            throw new Error(`Unable to decode type from message ${message}. MAX_TYPE = 255, got ${type} !`);
        return type;
    }
    static GetAck(message) {
        return message.readUint32BE(17);
    }
    static GetSid(message) {
        return message.readBigUInt64BE(0);
    }
    static GetPayload(message, encoding = "utf8") {
        return message.subarray(21).toString(encoding);
    }
    static Transaction = class {
        static GetChunkTxId(message) {
            return message.readUint32BE(17);
        }
        static GetChunkPayload(message, encoding = "utf8") {
            return message.subarray(21).toString(encoding);
        }
        static GetTxId(message) {
            return message.readUint32BE(21);
        }
        static GetTxName(message, encoding = "utf8") {
            return message.subarray(25).toString(encoding);
        }
    };
}
//# sourceMappingURL=BufferUtil.js.map