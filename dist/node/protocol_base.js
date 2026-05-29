export const CRYO_MAX_PAYLOAD = 16 * 1024 * 1024;
export const CRYO_PROTOCOL_VERSION = 1;
export const CRYO_FEATURE_MASK_TRANSACTION = 1n;
export const CRYO_PROTOCOL_FEATURES = 0n |
    CRYO_FEATURE_MASK_TRANSACTION;
export function cryoNewId() {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    let value = 0n;
    for (const byte of bytes)
        value = (value << 8n) | BigInt(byte);
    return value;
}
export function cryoHasFeatureFlag(flags, flag) {
    if (flag === 0n)
        return false;
    return (flags & flag) === flag;
}
export class DeserializationError extends Error {
    constructor(pMessage) {
        super(`Frame deserialization failed: ${pMessage}`);
        Object.setPrototypeOf(this, DeserializationError.prototype);
    }
}
export class SerializationError extends Error {
    constructor(pMessage) {
        super(`Frame serialization failed: ${pMessage}`);
        Object.setPrototypeOf(this, SerializationError.prototype);
    }
}
export var BinaryMessageType;
(function (BinaryMessageType) {
    BinaryMessageType[BinaryMessageType["ENDPOINT_INFO"] = 255] = "ENDPOINT_INFO";
    BinaryMessageType[BinaryMessageType["BYE"] = 254] = "BYE";
    BinaryMessageType[BinaryMessageType["ACK"] = 253] = "ACK";
    BinaryMessageType[BinaryMessageType["ERROR"] = 252] = "ERROR";
    BinaryMessageType[BinaryMessageType["PING_PONG"] = 251] = "PING_PONG";
    BinaryMessageType[BinaryMessageType["UTF8DATA"] = 250] = "UTF8DATA";
    BinaryMessageType[BinaryMessageType["BINARYDATA"] = 249] = "BINARYDATA";
    BinaryMessageType[BinaryMessageType["TX_START"] = 0] = "TX_START";
    BinaryMessageType[BinaryMessageType["TX_CHUNK"] = 1] = "TX_CHUNK";
    BinaryMessageType[BinaryMessageType["TX_FINISH"] = 2] = "TX_FINISH";
    BinaryMessageType[BinaryMessageType["TX_FLOW"] = 3] = "TX_FLOW";
    BinaryMessageType[BinaryMessageType["TX_FETCH"] = 4] = "TX_FETCH";
    BinaryMessageType[BinaryMessageType["TX_CANCEL"] = 5] = "TX_CANCEL";
})(BinaryMessageType || (BinaryMessageType = {}));
export var CRYO_FLOW_BEHAVIOUR;
(function (CRYO_FLOW_BEHAVIOUR) {
    CRYO_FLOW_BEHAVIOUR[CRYO_FLOW_BEHAVIOUR["TX_PUSH"] = 0] = "TX_PUSH";
    CRYO_FLOW_BEHAVIOUR[CRYO_FLOW_BEHAVIOUR["TX_PULL"] = 1] = "TX_PULL";
})(CRYO_FLOW_BEHAVIOUR || (CRYO_FLOW_BEHAVIOUR = {}));
//# sourceMappingURL=protocol_base.js.map