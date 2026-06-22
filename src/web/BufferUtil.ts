import { CAMPBuffer } from "./CAMPBuffer.js";
import { CAMPFrameType, CAMPBufferEncoding } from "../protocol_base.js";

export class BufferUtil {
    public static GetType(message: CAMPBuffer): CAMPFrameType {
        return message.readUint8(8);
    }

    public static GetAck(message: CAMPBuffer): number {
        return message.readUInt32BE(9);
    }

    public static GetSid(message: CAMPBuffer): bigint {
        return message.readBigUInt64BE(0);
    }

    public static GetPayload(message: CAMPBuffer, encoding: CAMPBufferEncoding): string {
        return message.subarray(13).toString(encoding);
    }

    public static EndpointInfo = class {
        public static GetVersion(message: CAMPBuffer): number {
            return message.readUInt32BE(13);
        }

        public static GetFlags(message: CAMPBuffer): bigint {
            return message.readBigUInt64BE(17);
        }
    };

    public static Transaction = class {
        public static GetTxId(message: CAMPBuffer): number {
            return message.readUInt32BE(13);
        }

        public static GetTxSize(message: CAMPBuffer): bigint {
            return message.readBigInt64BE(17);
        }

        public static GetFlowBehaviour(message: CAMPBuffer): number {
            return message.readUint8(25);
        }

        public static GetTxName(message: CAMPBuffer, encoding: "utf8" | "hex" = "utf8"): string {
            return message.subarray(26).toString(encoding);
        }

        public static GetChunkTxId(message: CAMPBuffer): number {
            return message.readUInt32BE(9);
        }

        public static GetChunkOffset(message: CAMPBuffer): bigint {
            return message.readBigUInt64BE(13);
        }

        public static GetChunkPayload(message: CAMPBuffer, encoding: CAMPBufferEncoding): string {
            return message.subarray(21).toString(encoding);
        }

        public static GetFetchTxId(message: CAMPBuffer): number {
            return message.readUInt32BE(13);
        }

        public static GetFetchStart(message: CAMPBuffer): bigint {
            return message.readBigUInt64BE(17);
        }

        public static GetFetchEnd(message: CAMPBuffer): bigint {
            return message.readBigUInt64BE(25);
        }
    };
}