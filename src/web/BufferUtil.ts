import {CryoBuffer} from "./CryoBuffer.js";
import {BinaryMessageType, BufferEncoding} from "../protocol_base.js";

export class BufferUtil {
    public static GetType(message: CryoBuffer): BinaryMessageType {
        return message.readUint8(8);
    }

    public static GetAck(message: CryoBuffer): number {
        return message.readUInt32BE(9);
    }

    public static GetSid(message: CryoBuffer): bigint {
        return message.readBigUInt64BE(0);
    }

    public static GetPayload(message: CryoBuffer, encoding: BufferEncoding): string {
        return message.subarray(13).toString(encoding);
    }

    public static Transaction = class {
        public static GetChunkTxId(message: CryoBuffer): number {
            return message.readUInt32BE(9);
        }

        public static GetChunkSeq(message: CryoBuffer): number {
            return message.readUInt32BE(13);
        }

        public static GetChunkPayload(message: CryoBuffer, encoding: BufferEncoding): string {
            return message.subarray(17).toString(encoding);
        }

        public static GetTxId(message: CryoBuffer): number {
            return message.readUInt32BE(13);
        }

        public static GetTxSize(message: CryoBuffer): number {
            return message.readInt32BE(17);
        }

        public static GetTxName(message: CryoBuffer, encoding: "utf8" | "hex" = "utf8"): string {
            return message.subarray(21).toString(encoding);
        }

        public static GetFlowBehaviour(message: CryoBuffer): number {
            return message.readUint8(13);
        }

        public static GetFetchTxId(message: CryoBuffer): number {
            return message.readUInt32BE(13);
        }

        public static GetFetchStart(message: CryoBuffer): number {
            return message.readUInt32BE(17);
        }

        public static GetFetchEnd(message: CryoBuffer): number {
            return message.readUInt32BE(21);
        }
    }
}