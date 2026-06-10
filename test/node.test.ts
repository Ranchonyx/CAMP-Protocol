import {expect, config} from "chai";

config.truncateThreshold = 0;
import {Buffer} from "node:buffer"
import * as impl from "../dist/node/index.node.js"
import {
    CAMP_PROTOCOL_FEATURES,
    CAMP_PROTOCOL_VERSION,
    EndpointInfoFrame,
    CAMPFrameType,
    CAMP_FLOW_BEHAVIOUR
} from "../dist/node/index.node.js"

import type {
    EndpointInfoMessage,
    ByeMessage,
    AckMessage,
    ErrorMessage,
    PingMessage,
    UTF8DataMessage,
    BinaryDataMessage,
    TXChunkMessage,
    TXFinishMessage,
    TXFetchMessage,
    TXStartMessage,
    TXCancelMessage
} from "../dist/node/index.node.js"

import {
    ByeFrame,
    ACKFrame,
    ErrorFrame,
    PingPongFrame,
    Utf8DataFrame,
    BinaryDataFrame,
    TXStartFrame,
    TXChunkFrame,
    TXFinishFrame,
    TXFetchFrame,
    TXCancelFrame
} from "../dist/node/index.node.js";

const sid: bigint = 1n;
const txId: number = 0;

const CAMP_BASE: Record<string, Buffer | object> = {};

describe("Namespace: CAMP.Base Serialization", function () {

    it("serializes endpoint_info", () => {
        expect(() => CAMP_BASE.FRAME_ENDPOINT_INFO = impl.EndpointInfoFrame.Serialize(sid, 0)).to.not.throw();
        CAMP_BASE.MSG_ENDPOINT_INFO = {
            ack: 0,
            sid: sid,
            features: CAMP_PROTOCOL_FEATURES,
            type: CAMPFrameType.ENDPOINT_INFO,
            version: CAMP_PROTOCOL_VERSION
        } as EndpointInfoMessage;
    });

    it("serializes bye", () => {
        expect(() => CAMP_BASE.FRAME_BYE = impl.ByeFrame.Serialize(sid, 0, "client navigated away")).to.not.throw();
        CAMP_BASE.MSG_BYE = {
            type: CAMPFrameType.BYE,
            sid: sid,
            ack: 0,
            reason: "client navigated away"
        } as ByeMessage;
    });

    it("serializes ack", () => {
        expect(() => CAMP_BASE.FRAME_ACK = impl.ACKFrame.Serialize(sid, 0)).to.not.throw();
        CAMP_BASE.MSG_ACK = {
            ack: 0,
            sid: sid,
            type: CAMPFrameType.ACK
        } as AckMessage;
    });

    it("serializes error", () => {
        expect(() => CAMP_BASE.FRAME_ERROR = impl.ErrorFrame.Serialize(sid, 0, "client error occured, details: ...")).to.not.throw();
        CAMP_BASE.MSG_ERROR = {
            ack: 0,
            sid: sid,
            type: CAMPFrameType.ERROR,
            payload: "client error occured, details: ..."
        } as ErrorMessage;
    });

    it("serializes ping_pong", () => {
        expect(() => CAMP_BASE.FRAME_PING_PONG = impl.PingPongFrame.Serialize(sid, "ping")).to.not.throw();
        CAMP_BASE.MSG_PING_PONG = {
            sid: sid,
            type: CAMPFrameType.PING_PONG,
            payload: "ping",
        } as PingMessage;
    });

    it("serializes utf8data", () => {
        expect(() => CAMP_BASE.FRAME_UTF8DATA = impl.Utf8DataFrame.Serialize(sid, 0, "some great plaintext!")).to.not.throw();
        CAMP_BASE.MSG_UTF8DATA = {
            ack: 0,
            sid: sid,
            type: CAMPFrameType.UTF8DATA,
            payload: "some great plaintext!"
        } as UTF8DataMessage;
    });

    it("serializes binarydata", () => {
        expect(() => CAMP_BASE.FRAME_BINARYDATA = impl.BinaryDataFrame.Serialize(sid, 0, Buffer.from("meow", "utf8"))).to.not.throw();
        CAMP_BASE.MSG_BINARYDATA = {
            ack: 0,
            sid: sid,
            type: CAMPFrameType.BINARYDATA,
            payload: Buffer.from("meow", "utf8")
        } as BinaryDataMessage;
    });
});

const CAMP_TRANSACTION: Record<string, Buffer | object> = {};
describe("Namespace CAMP.Transaction Serialization", function () {
    it("serializes tx_start", () => {
        expect(() => CAMP_TRANSACTION.FRAME_TX_START = impl.TXStartFrame.Serialize(sid, 0, txId, "some tran")).to.not.throw();
        CAMP_TRANSACTION.MSG_TX_START = {
            ack: 0,
            sid: sid,
            type: CAMPFrameType.TX_START,
            txId: txId,
            txName: "some tran",
            byteLength: null,
            behaviour: CAMP_FLOW_BEHAVIOUR.TX_PUSH
        } as TXStartMessage;
    });

    it("serializes tx_chunk", () => {
        expect(() => CAMP_TRANSACTION.FRAME_TX_CHUNK = impl.TXChunkFrame.Serialize(sid, txId, 2n, Buffer.alloc(1024).fill(200))).to.not.throw();
        CAMP_TRANSACTION.MSG_TX_CHUNK = {
            sid: sid,
            type: CAMPFrameType.TX_CHUNK,
            txId: txId,
            payload: Buffer.alloc(1024).fill(200),
            offset: 2n
        } as TXChunkMessage;
    })

    it("serializes tx_finish", () => {
        expect(() => CAMP_TRANSACTION.FRAME_TX_FINISH = impl.TXFinishFrame.Serialize(sid, 0, txId)).to.not.throw();
        CAMP_TRANSACTION.MSG_TX_FINISH = {
            ack: 0,
            sid: sid,
            type: CAMPFrameType.TX_FINISH,
            txId: txId
        } as TXFinishMessage;
    })

    it("serializes tx_fetch", () => {
        expect(() => CAMP_TRANSACTION.FRAME_TX_FETCH = impl.TXFetchFrame.Serialize(sid, 0, 0xff, 12n, 24n)).to.not.throw();
        CAMP_TRANSACTION.MSG_TX_FETCH = {
            ack: 0,
            sid: sid,
            txId: 0xff,
            type: CAMPFrameType.TX_FETCH,
            start: 12n,
            end: 24n
        } as TXFetchMessage;
    });

    it("Serializes tx_cancel", () => {
        expect(() => CAMP_TRANSACTION.FRAME_TX_CANCEL = impl.TXCancelFrame.Serialize(sid, 0, 0xff)).to.not.throw();
        CAMP_TRANSACTION.MSG_TX_CANCEL = {
            ack: 0,
            sid: sid,
            txId: 0xff,
            type: CAMPFrameType.TX_CANCEL
        } as TXCancelMessage;
    });
});

describe("Namespace: CAMP.Base Deserialization", function () {
    it("deserializes endpoint info", () => expect(EndpointInfoFrame.Deserialize(CAMP_BASE.FRAME_ENDPOINT_INFO as Buffer)).to.deep.equal(CAMP_BASE.MSG_ENDPOINT_INFO, "ENDPOINT_INFO"));
    it("deserializes bye", () => expect(ByeFrame.Deserialize(CAMP_BASE.FRAME_BYE as Buffer)).to.deep.equal(CAMP_BASE.MSG_BYE, "BYE"));
    it("deserializes ack", () => expect(ACKFrame.Deserialize(CAMP_BASE.FRAME_ACK as Buffer)).to.deep.equal(CAMP_BASE.MSG_ACK, "ACK"));
    it("deserializes error", () => expect(ErrorFrame.Deserialize(CAMP_BASE.FRAME_ERROR as Buffer)).to.deep.equal(CAMP_BASE.MSG_ERROR, "ERROR"));
    it("deserializes ping_pong", () => expect(PingPongFrame.Deserialize(CAMP_BASE.FRAME_PING_PONG as Buffer)).to.deep.equal(CAMP_BASE.MSG_PING_PONG, "PING_PONG"));
    it("deserializes utf8data", () => expect(Utf8DataFrame.Deserialize(CAMP_BASE.FRAME_UTF8DATA as Buffer)).to.deep.equal(CAMP_BASE.MSG_UTF8DATA, "UTF8DATA"));
    it("deserializes binarydata", () => expect(BinaryDataFrame.Deserialize(CAMP_BASE.FRAME_BINARYDATA as Buffer)).to.deep.equal(CAMP_BASE.MSG_BINARYDATA, "BINARYDATA"));
});

describe("Namespace: CAMP.Transaction Deserialization", function () {
    it("deserializes tx_start", () => expect(TXStartFrame.Deserialize(CAMP_TRANSACTION.FRAME_TX_START as Buffer)).to.deep.equal(CAMP_TRANSACTION.MSG_TX_START));
    it("deserializes tx_chunk", () => expect(TXChunkFrame.Deserialize(CAMP_TRANSACTION.FRAME_TX_CHUNK as Buffer)).to.deep.equal(CAMP_TRANSACTION.MSG_TX_CHUNK));
    it("deserializes tx_finish", () => expect(TXFinishFrame.Deserialize(CAMP_TRANSACTION.FRAME_TX_FINISH as Buffer)).to.deep.equal(CAMP_TRANSACTION.MSG_TX_FINISH));
    it("deserializes tx_fetch", () => expect(TXFetchFrame.Deserialize(CAMP_TRANSACTION.FRAME_TX_FETCH as Buffer)).to.deep.equal(CAMP_TRANSACTION.MSG_TX_FETCH));
    it("deserializes tx_cancel", () => expect(TXCancelFrame.Deserialize(CAMP_TRANSACTION.FRAME_TX_CANCEL as Buffer)).to.deep.equal(CAMP_TRANSACTION.MSG_TX_CANCEL));
});