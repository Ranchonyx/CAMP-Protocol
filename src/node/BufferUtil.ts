import {CAMPFrameType, CAMPBufferEncoding} from "../protocol_base.js";

export class BufferUtil {
    public static GetType(message: Buffer): CAMPFrameType {
        return message.readUint8(8);
    }

    public static GetAck(message: Buffer): number {
        return message.readUInt32BE(9);
    }

    public static GetSid(message: Buffer): bigint {
        return message.readBigUInt64BE(0);
    }

    public static GetPayload(message: Buffer, encoding: BufferEncoding): string {
        return message.subarray(13).toString(encoding);
    }

    public static EndpointInfo = class {
        public static GetVersion(message: Buffer): number {
            return message.readUInt32BE(13);
        }

        public static GetFlags(message: Buffer): bigint {
            return message.readBigUInt64BE(17);
        }
    };

    public static Transaction = class {
        public static GetTxId(message: Buffer): number {
            return message.readUInt32BE(13);
        }

        public static GetTxSize(message: Buffer): bigint {
            return message.readBigInt64BE(17);
        }

        public static GetFlowBehaviour(message: Buffer): number {
            return message.readUint8(25);
        }

        public static GetTxName(message: Buffer, encoding: "utf8" | "hex" = "utf8"): string {
            return message.subarray(26).toString(encoding);
        }

        public static GetChunkTxId(message: Buffer): number {
            return message.readUInt32BE(9);
        }

        public static GetChunkOffset(message: Buffer): bigint {
            return message.readBigUInt64BE(13);
        }

        public static GetChunkPayload(message: Buffer, encoding: BufferEncoding): string {
            return message.subarray(21).toString(encoding);
        }

        public static GetFetchTxId(message: Buffer): number {
            return message.readUInt32BE(13);
        }

        public static GetFetchStart(message: Buffer): bigint {
            return message.readBigUInt64BE(17);
        }

        public static GetFetchEnd(message: Buffer): bigint {
            return message.readBigUInt64BE(25);
        }
    };
}