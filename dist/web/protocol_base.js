export const CAMP_MAX_PAYLOAD = 1 * 1024 * 1024;
export const CAMP_PROTOCOL_VERSION = 1;
export const CAMP_FEATURE_MASK_TRANSACTION = 1n;
export const CAMP_PROTOCOL_FEATURES = 0n |
    CAMP_FEATURE_MASK_TRANSACTION;
export var CAMP_FLOW_BEHAVIOUR;
(function (CAMP_FLOW_BEHAVIOUR) {
    CAMP_FLOW_BEHAVIOUR[CAMP_FLOW_BEHAVIOUR["TX_PUSH"] = 0] = "TX_PUSH";
    CAMP_FLOW_BEHAVIOUR[CAMP_FLOW_BEHAVIOUR["TX_PULL"] = 1] = "TX_PULL";
})(CAMP_FLOW_BEHAVIOUR || (CAMP_FLOW_BEHAVIOUR = {}));
export function CAMPNewId() {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    let value = 0n;
    for (const byte of bytes)
        value = (value << 8n) | BigInt(byte);
    return value;
}
export function CAMPHasFeatureFlag(flags, flag) {
    if (flag === 0n)
        return false;
    return (flags & flag) === flag;
}
export class DeserializationError extends Error {
    constructor(pMessage) {
        super(`CAMP Frame deserialization failed: ${pMessage}`);
        Object.setPrototypeOf(this, DeserializationError.prototype);
    }
}
export class SerializationError extends Error {
    constructor(pMessage) {
        super(`CAMP Frame serialization failed: ${pMessage}`);
        Object.setPrototypeOf(this, SerializationError.prototype);
    }
}
export var CAMPFrameType;
(function (CAMPFrameType) {
    CAMPFrameType[CAMPFrameType["ENDPOINT_INFO"] = 255] = "ENDPOINT_INFO";
    CAMPFrameType[CAMPFrameType["BYE"] = 254] = "BYE";
    CAMPFrameType[CAMPFrameType["ACK"] = 253] = "ACK";
    CAMPFrameType[CAMPFrameType["ERROR"] = 252] = "ERROR";
    CAMPFrameType[CAMPFrameType["PING_PONG"] = 251] = "PING_PONG";
    CAMPFrameType[CAMPFrameType["UTF8DATA"] = 250] = "UTF8DATA";
    CAMPFrameType[CAMPFrameType["BINARYDATA"] = 249] = "BINARYDATA";
    CAMPFrameType[CAMPFrameType["TX_START"] = 0] = "TX_START";
    CAMPFrameType[CAMPFrameType["TX_CHUNK"] = 1] = "TX_CHUNK";
    CAMPFrameType[CAMPFrameType["TX_FINISH"] = 2] = "TX_FINISH";
    CAMPFrameType[CAMPFrameType["TX_FETCH"] = 3] = "TX_FETCH";
    CAMPFrameType[CAMPFrameType["TX_CANCEL"] = 4] = "TX_CANCEL";
})(CAMPFrameType || (CAMPFrameType = {}));
//# sourceMappingURL=protocol_base.js.map