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

    public static GetPayload(message: Buffer, encoding: CAMPBufferEncoding): string {
        return message.subarray(13).toString(encoding);
    }

    public static Transaction = class {
        public static GetChunkTxId(message: Buffer): number {
            return message.readUInt32BE(9);
        }

        public static GetChunkSeq(message: Buffer): number {
            return message.readUInt32BE(13);
        }

        public static GetChunkPayload(message: Buffer, encoding: CAMPBufferEncoding): string {
            return message.subarray(17).toString(encoding);
        }

        public static GetTxId(message: Buffer): number {
            return message.readUInt32BE(13);
        }

        public static GetTxSize(message: Buffer): number {
            return message.readInt32BE(17);
        }

        public static GetTxName(message: Buffer, encoding: "utf8" | "hex" = "utf8"): string {
            return message.subarray(21).toString(encoding);
        }

        public static GetFlowBehaviour(message: Buffer): number {
            return message.readUint8(13);
        }

        public static GetFetchTxId(message: Buffer): number {
            return message.readUInt32BE(13);
        }

        public static GetFetchStart(message: Buffer): number {
            return message.readUInt32BE(17);
        }

        public static GetFetchEnd(message: Buffer): number {
            return message.readUInt32BE(21);
        }
    }
}