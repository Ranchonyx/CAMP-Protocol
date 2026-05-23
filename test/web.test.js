const {expect} = chai;
chai.config.truncateThreshold = 0;
import * as impl from "../dist/web/index.web.js"
import {
    CRYO_PROTOCOL_FEATURES,
    CRYO_PROTOCOL_VERSION,
    EndpointInfoFrame,
    BinaryMessageType,
    CRYO_FLOW_BEHAVIOUR
} from "../dist/web/index.web.js"

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
    TXFetchFrame,
    CryoBuffer
} from "../dist/web/index.web.js";

const sid = 1n;
const txId = 0;

const Cryo_Base = {};

function strip(obj, key) {
    const cpy = structuredClone(obj);
    delete cpy[key];
    return cpy;
}

describe("Namespace: Cryo.Base Serialization", function () {

    it("serializes endpoint_info", () => {
        expect(() => Cryo_Base.FRAME_ENDPOINT_INFO = impl.EndpointInfoFrame.Serialize(sid, 0)).to.not.throw();
        Cryo_Base.MSG_ENDPOINT_INFO = {
            ack: 0,
            sid: sid,
            features: CRYO_PROTOCOL_FEATURES,
            type: BinaryMessageType.ENDPOINT_INFO,
            version: CRYO_PROTOCOL_VERSION
        };
    });

    it("serializes bye", () => {
        expect(() => Cryo_Base.FRAME_BYE = impl.ByeFrame.Serialize(sid, 0, "client navigated away")).to.not.throw();
        Cryo_Base.MSG_BYE = {
            type: BinaryMessageType.BYE,
            sid: sid,
            ack: 0,
            reason: "client navigated away"
        };
    });

    it("serializes ack", () => {
        expect(() => Cryo_Base.FRAME_ACK = impl.ACKFrame.Serialize(sid, 0)).to.not.throw();
        Cryo_Base.MSG_ACK = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.ACK
        };
    });

    it("serializes error", () => {
        expect(() => Cryo_Base.FRAME_ERROR = impl.ErrorFrame.Serialize(sid, 0, "client error occured, details: ...")).to.not.throw();
        Cryo_Base.MSG_ERROR = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.ERROR,
            payload: "client error occured, details: ..."
        };
    });

    it("serializes ping_pong", () => {
        expect(() => Cryo_Base.FRAME_PING_PONG = impl.PingPongFrame.Serialize(sid, 0, "ping")).to.not.throw();
        Cryo_Base.MSG_PING_PONG = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.PING_PONG,
            payload: "ping",
        };
    });

    it("serializes utf8data", () => {
        expect(() => Cryo_Base.FRAME_UTF8DATA = impl.Utf8DataFrame.Serialize(sid, 0, "some great plaintext!")).to.not.throw();
        Cryo_Base.MSG_UTF8DATA = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.UTF8DATA,
            payload: "some great plaintext!"
        };
    });

    it("serializes binarydata", () => {
        expect(() => Cryo_Base.FRAME_BINARYDATA = impl.BinaryDataFrame.Serialize(sid, 0, CryoBuffer.from("meow", "utf8"))).to.not.throw();
        Cryo_Base.MSG_BINARYDATA = {
            sid: sid,
            ack: 0,
            type: BinaryMessageType.BINARYDATA,
        };
        Cryo_Base.PAYLOAD_BINARYDATA = CryoBuffer.from("meow", "utf8");
    });
});

const Cryo_Transaction = {};
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
        };
    });

    it("serializes tx_chunk", () => {
        expect(() => Cryo_Transaction.FRAME_TX_CHUNK = impl.TXChunkFrame.Serialize(sid, txId, 2, CryoBuffer.alloc(1024).fill(200))).to.not.throw();
        Cryo_Transaction.MSG_TX_CHUNK = {
            sid: sid,
            type: BinaryMessageType.TX_CHUNK,
            txId: txId,
            seq: 2,
        };
        Cryo_Transaction.PAYLOAD_TX_CHUNK = CryoBuffer.alloc(1024).fill(200);
    })

    it("serializes tx_finish", () => {
        expect(() => Cryo_Transaction.FRAME_TX_FINISH = impl.TXFinishFrame.Serialize(sid, 0, txId)).to.not.throw();
        Cryo_Transaction.MSG_TX_FINISH = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.TX_FINISH,
            txId: txId
        };
    })

    it("serializes tx_flow", () => {
        expect(() => Cryo_Transaction.FRAME_TX_FLOW = impl.TXFlowFrame.Serialize(sid, 0, CRYO_FLOW_BEHAVIOUR.TX_PULL)).to.not.throw();
        Cryo_Transaction.MSG_TX_FLOW = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.TX_FLOW,
            behaviour: CRYO_FLOW_BEHAVIOUR.TX_PULL
        };
    });

    it("serializes tx_fetch", () => {
        expect(() => Cryo_Transaction.FRAME_TX_FETCH = impl.TXFetchFrame.Serialize(sid, 0, 12, 24)).to.not.throw();
        Cryo_Transaction.MSG_TX_FETCH = {
            ack: 0,
            sid: sid,
            type: BinaryMessageType.TX_FETCH,
            start: 12,
            end: 24
        };
    })
});

describe("Namespace: Cryo.Base Deserialization", function () {
    it("deserializes endpoint info", () => expect(EndpointInfoFrame.Deserialize(Cryo_Base.FRAME_ENDPOINT_INFO)).to.deep.equal(Cryo_Base.MSG_ENDPOINT_INFO, "ENDPOINT_INFO"));
    it("deserializes bye", () => expect(ByeFrame.Deserialize(Cryo_Base.FRAME_BYE)).to.deep.equal(Cryo_Base.MSG_BYE, "BYE"));
    it("deserializes ack", () => expect(ACKFrame.Deserialize(Cryo_Base.FRAME_ACK)).to.deep.equal(Cryo_Base.MSG_ACK, "ACK"));
    it("deserializes error", () => expect(ErrorFrame.Deserialize(Cryo_Base.FRAME_ERROR)).to.deep.equal(Cryo_Base.MSG_ERROR, "ERROR"));
    it("deserializes ping_pong", () => expect(PingPongFrame.Deserialize(Cryo_Base.FRAME_PING_PONG)).to.deep.equal(Cryo_Base.MSG_PING_PONG, "PING_PONG"));
    it("deserializes utf8data", () => expect(Utf8DataFrame.Deserialize(Cryo_Base.FRAME_UTF8DATA)).to.deep.equal(Cryo_Base.MSG_UTF8DATA, "UTF8DATA"));
    it("deserializes binarydata", () => {
        const result = BinaryDataFrame.Deserialize(Cryo_Base.FRAME_BINARYDATA);

        //Compare payload separately
        expect(result.payload.toString("hex")).to.equal(Cryo_Base.PAYLOAD_BINARYDATA.toString("hex"));
        expect(strip(result, "payload")).to.deep.equal(Cryo_Base.MSG_BINARYDATA);
    });
});

describe("Namespace: Cryo.Transaction Deserialization", function () {
    it("deserializes tx_start", () => expect(TXStartFrame.Deserialize(Cryo_Transaction.FRAME_TX_START)).to.deep.equal(Cryo_Transaction.MSG_TX_START));
    it("deserializes tx_chunk", () => {
        const result = TXChunkFrame.Deserialize(Cryo_Transaction.FRAME_TX_CHUNK);

        //Compare payload separately
        expect(result.payload.toString("hex")).to.equal(Cryo_Transaction.PAYLOAD_TX_CHUNK.toString("hex"));
        expect(strip(result, "payload")).to.deep.equal(Cryo_Transaction.MSG_TX_CHUNK);
    });
    it("deserializes tx_finish", () => expect(TXFinishFrame.Deserialize(Cryo_Transaction.FRAME_TX_FINISH)).to.deep.equal(Cryo_Transaction.MSG_TX_FINISH));
    it("deserializes tx_flow", () => expect(TXFlowFrame.Deserialize(Cryo_Transaction.FRAME_TX_FLOW)).to.deep.equal(Cryo_Transaction.MSG_TX_FLOW));
    it("deserializes tx_fetch", () => expect(TXFetchFrame.Deserialize(Cryo_Transaction.FRAME_TX_FETCH)).to.deep.equal(Cryo_Transaction.MSG_TX_FETCH));
});