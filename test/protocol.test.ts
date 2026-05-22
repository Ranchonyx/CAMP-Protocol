import {expect, config} from "chai";

config.truncateThreshold = 0;
import {Buffer} from "node:buffer"
import * as impl from "../dist/node/index.node.js"
import {
    CRYO_PROTOCOL_FEATURES,
    CRYO_PROTOCOL_VERSION,
    EndpointInfoFrame,
    BinaryMessageType,
    CRYO_FLOW_BEHAVIOUR
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
    TXFlowMessage,
    TXFetchMessage,
    TXStartMessage
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
    TXFlowFrame,
    TXFetchFrame
} from "../dist/node/index.node.js";

const sid: bigint = 1n;
const txId: number = 0;

const Cryo_Base: Record<string, Buffer | object> = {};

describe("Namespace: Cryo.Base Serialization", function () {

    it("serializes endpoint_info", () => {
        expect(() => Cryo_Base.FRAME_ENDPOINT_INFO = impl.EndpointInfoFrame.Serialize(sid, 0)).to.not.throw();
        Cryo_Base.MSG_ENDPOINT_INFO = {
            ack: 0,
            sid: sid,
            features: CRYO_PROTOCOL_FEATURES,
            type: BinaryMessageType.ENDPOINT_INFO,
            version: CRYO_PROTOCOL_VERSION
        } as EndpointInfoMessage;
    });

    it("serializes bye", () => {
        expect(() => Cryo_Base.FRAME_BYE = impl.ByeFrame.Serialize(sid, 0, "client navigated away")).to.not.throw();
        Cryo_Base.MSG_BYE = {
            type: BinaryMessageType.BYE,
            sid: sid,
            ack: 0,
            reason: "client navigated away"
        } as ByeMessage;
    });

    it("serializes ack", () => {
        expect(() => Cryo_Base.FRAME_ACK = impl.ACKFrame.Serialize(sid, 0)).to.not.throw();
        Cryo_Base.MSG_ACK = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.ACK
        } as AckMessage;
    });

    it("serializes error", () => {
        expect(() => Cryo_Base.FRAME_ERROR = impl.ErrorFrame.Serialize(sid, 0, "client error occured, details: ...")).to.not.throw();
        Cryo_Base.MSG_ERROR = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.ERROR,
            payload: "client error occured, details: ..."
        } as ErrorMessage;
    });

    it("serializes ping_pong", () => {
        expect(() => Cryo_Base.FRAME_PING_PONG = impl.PingPongFrame.Serialize(sid, 0, "ping")).to.not.throw();
        Cryo_Base.MSG_PING_PONG = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.PING_PONG,
            payload: "ping",
        } as PingMessage;
    });

    it("serializes utf8data", () => {
        expect(() => Cryo_Base.FRAME_UTF8DATA = impl.Utf8DataFrame.Serialize(sid, 0, "some great plaintext!")).to.not.throw();
        Cryo_Base.MSG_UTF8DATA = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.UTF8DATA,
            payload: "some great plaintext!"
        } as UTF8DataMessage;
    });

    it("serializes binarydata", () => {
        expect(() => Cryo_Base.FRAME_BINARYDATA = impl.BinaryDataFrame.Serialize(sid, 0, Buffer.from("meow", "utf8"))).to.not.throw();
        Cryo_Base.MSG_BINARYDATA = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.BINARYDATA,
            payload: Buffer.from("meow", "utf8")
        } as BinaryDataMessage;
    });
});

const Cryo_Transaction: Record<string, Buffer | object> = {};
describe("Namespace Cryo.Transaction Serialization", function () {
    it("serializes tx_start", () => {
        expect(() => Cryo_Transaction.FRAME_TX_START = impl.TXStartFrame.Serialize(sid, 0, txId, "some tran")).to.not.throw();
        Cryo_Transaction.MSG_TX_START = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.TX_START,
            txId: txId,
            txName: "some tran",
            byteLength: null
        } as TXStartMessage;
    });

    it("serializes tx_chunk", () => {
        expect(() => Cryo_Transaction.FRAME_TX_CHUNK = impl.TXChunkFrame.Serialize(sid, txId, 2, Buffer.alloc(1024).fill(200))).to.not.throw();
        Cryo_Transaction.MSG_TX_CHUNK = {
            sid: sid,
            type: BinaryMessageType.TX_CHUNK,
            txId: txId,
            payload: Buffer.alloc(1024).fill(200),
            seq: 2
        } as TXChunkMessage;
    })

    it("serializes tx_finish", () => {
        expect(() => Cryo_Transaction.FRAME_TX_FINISH = impl.TXFinishFrame.Serialize(sid, 0, txId)).to.not.throw();
        Cryo_Transaction.MSG_TX_FINISH = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.TX_FINISH,
            txId: txId
        } as TXFinishMessage;
    })

    it("serializes tx_flow", () => {
        expect(() => Cryo_Transaction.FRAME_TX_FLOW = impl.TXFlowFrame.Serialize(sid, 0, CRYO_FLOW_BEHAVIOUR.TX_PULL)).to.not.throw();
        Cryo_Transaction.MSG_TX_FLOW = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.TX_FLOW,
            behaviour: CRYO_FLOW_BEHAVIOUR.TX_PULL
        } as TXFlowMessage;
    });

    it("serializes tx_fetch", () => {
        expect(() => Cryo_Transaction.FRAME_TX_FETCH = impl.TXFetchFrame.Serialize(sid, 0, 12, 24)).to.not.throw();
        Cryo_Transaction.MSG_TX_FETCH = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.TX_FETCH,
            start: 12,
            end: 24
        } as TXFetchMessage;
    })
});

describe("Namespace: Cryo.Base Deserialization", function () {
    it("deserializes endpoint info", () => expect(EndpointInfoFrame.Deserialize(Cryo_Base.FRAME_ENDPOINT_INFO as Buffer)).to.deep.equal(Cryo_Base.MSG_ENDPOINT_INFO, "ENDPOINT_INFO"));
    it("deserializes bye", () => expect(ByeFrame.Deserialize(Cryo_Base.FRAME_BYE as Buffer)).to.deep.equal(Cryo_Base.MSG_BYE, "BYE"));
    it("deserializes ack", () => expect(ACKFrame.Deserialize(Cryo_Base.FRAME_ACK as Buffer)).to.deep.equal(Cryo_Base.MSG_ACK, "ACK"));
    it("deserializes error", () => expect(ErrorFrame.Deserialize(Cryo_Base.FRAME_ERROR as Buffer)).to.deep.equal(Cryo_Base.MSG_ERROR, "ERROR"));
    it("deserializes ping_pong", () => expect(PingPongFrame.Deserialize(Cryo_Base.FRAME_PING_PONG as Buffer)).to.deep.equal(Cryo_Base.MSG_PING_PONG, "PING_PONG"));
    it("deserializes utf8data", () => expect(Utf8DataFrame.Deserialize(Cryo_Base.FRAME_UTF8DATA as Buffer)).to.deep.equal(Cryo_Base.MSG_UTF8DATA, "UTF8DATA"));
    it("deserializes binarydata", () => expect(BinaryDataFrame.Deserialize(Cryo_Base.FRAME_BINARYDATA as Buffer)).to.deep.equal(Cryo_Base.MSG_BINARYDATA, "BINARYDATA"));
});

describe("Namespace: Cryo.Transaction Deserialization", function () {
    it("deserializes tx_start", () => expect(TXStartFrame.Deserialize(Cryo_Transaction.FRAME_TX_START as Buffer)).to.deep.equal(Cryo_Transaction.MSG_TX_START));
    it("deserializes tx_chunk", () => expect(TXChunkFrame.Deserialize(Cryo_Transaction.FRAME_TX_CHUNK as Buffer)).to.deep.equal(Cryo_Transaction.MSG_TX_CHUNK));
    it("deserializes tx_finish", () => expect(TXFinishFrame.Deserialize(Cryo_Transaction.FRAME_TX_FINISH as Buffer)).to.deep.equal(Cryo_Transaction.MSG_TX_FINISH));
    it("deserializes tx_flow", () => expect(TXFlowFrame.Deserialize(Cryo_Transaction.FRAME_TX_FLOW as Buffer)).to.deep.equal(Cryo_Transaction.MSG_TX_FLOW));
    it("deserializes tx_fetch", () => expect(TXFetchFrame.Deserialize(Cryo_Transaction.FRAME_TX_FETCH as Buffer)).to.deep.equal(Cryo_Transaction.MSG_TX_FETCH));
});