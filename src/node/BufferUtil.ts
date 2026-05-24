import {BinaryMessageType} from "../protocol_base.js";

export class BufferUtil {
    public static GetType(message: Buffer): BinaryMessageType {
        const type = message.readUint8(16);
        if (type > 0xff)
            throw new Error(`Unable to decode type from message ${message}. MAX_TYPE = 255, got ${type} !`);

        return type;
    }

    public static GetAck(message: Buffer): number {
        return message.readUint32BE(17);
    }

    public static GetSid(message: Buffer): bigint {
        return message.readBigUInt64BE(0);
    }

    public static GetPayload(message: Buffer, encoding: BufferEncoding = "utf8"): string {
        return message.subarray(21).toString(encoding);
    }

    public static Transaction = class {
        public static GetChunkTxId(message: Buffer) {
            return message.readUint32BE(17);
        }

        public static GetChunkPayload(message: Buffer, encoding: BufferEncoding = "utf8"): string {
            return message.subarray(21).toString(encoding);
        }

        public static GetTxId(message: Buffer) {
            return message.readUint32BE(21);
        }

        public static GetTxName(message: Buffer, encoding: BufferEncoding = "utf8") {
            return message.subarray(25).toString(encoding);
        }
    }
}