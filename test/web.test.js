const {expect} = chai;
chai.config.truncateThreshold = 0;
import * as impl from "../dist/web/index.web.js"
import {
    CAMP_PROTOCOL_FEATURES,
    CAMP_PROTOCOL_VERSION,
    EndpointInfoFrame,
    CAMPFrameType,
    CAMP_FLOW_BEHAVIOUR
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
    TXFetchFrame,
    TXCancelFrame,
    CAMPBuffer
} from "../dist/web/index.web.js";

const sid = 1n;
const txId = 0;

const CAMP_BASE = {};

function strip(obj, key) {
    const cpy = structuredClone(obj);
    delete cpy[key];
    return cpy;
}

describe("Namespace: CAMP.Base Serialization", function () {

    it("serializes endpoint_info", () => {
        expect(() => CAMP_BASE.FRAME_ENDPOINT_INFO = impl.EndpointInfoFrame.Serialize(sid, 0)).to.not.throw();
        CAMP_BASE.MSG_ENDPOINT_INFO = {
            ack: 0,
            sid: sid,
            features: CAMP_PROTOCOL_FEATURES,
            type: CAMPFrameType.ENDPOINT_INFO,
            version: CAMP_PROTOCOL_VERSION
        };
    });

    it("serializes bye", () => {
        expect(() => CAMP_BASE.FRAME_BYE = impl.ByeFrame.Serialize(sid, 0, "client navigated away")).to.not.throw();
        CAMP_BASE.MSG_BYE = {
            type: CAMPFrameType.BYE,
            sid: sid,
            ack: 0,
            reason: "client navigated away"
        };
    });

    it("serializes ack", () => {
        expect(() => CAMP_BASE.FRAME_ACK = impl.ACKFrame.Serialize(sid, 0)).to.not.throw();
        CAMP_BASE.MSG_ACK = {
            ack: 0,
            sid: sid,
            type: CAMPFrameType.ACK
        };
    });

    it("serializes error", () => {
        expect(() => CAMP_BASE.FRAME_ERROR = impl.ErrorFrame.Serialize(sid, 0, "client error occured, details: ...")).to.not.throw();
        CAMP_BASE.MSG_ERROR = {
            ack: 0,
            sid: sid,
            type: CAMPFrameType.ERROR,
            payload: "client error occured, details: ..."
        };
    });

    it("serializes ping_pong", () => {
        expect(() => CAMP_BASE.FRAME_PING_PONG = impl.PingPongFrame.Serialize(sid, "ping")).to.not.throw();
        CAMP_BASE.MSG_PING_PONG = {
            sid: sid,
            type: CAMPFrameType.PING_PONG,
            payload: "ping",
        };
    });

    it("serializes utf8data", () => {
        expect(() => CAMP_BASE.FRAME_UTF8DATA = impl.Utf8DataFrame.Serialize(sid, 0, "some great plaintext!")).to.not.throw();
        CAMP_BASE.MSG_UTF8DATA = {
            ack: 0,
            sid: sid,
            type: CAMPFrameType.UTF8DATA,
            payload: "some great plaintext!"
        };
    });

    it("serializes binarydata", () => {
        expect(() => CAMP_BASE.FRAME_BINARYDATA = impl.BinaryDataFrame.Serialize(sid, 0, CAMPBuffer.from("meow", "utf8"))).to.not.throw();
        CAMP_BASE.MSG_BINARYDATA = {
            sid: sid,
            ack: 0,
            type: CAMPFrameType.BINARYDATA,
        };
        CAMP_BASE.PAYLOAD_BINARYDATA = CAMPBuffer.from("meow", "utf8");
    });
});

const CAMP_TRANSACTION = {};
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
        };
    });

    it("serializes tx_chunk", () => {
        expect(() => CAMP_TRANSACTION.FRAME_TX_CHUNK = impl.TXChunkFrame.Serialize(sid, txId, 2n, CAMPBuffer.alloc(1024).fill(200))).to.not.throw();
        CAMP_TRANSACTION.MSG_TX_CHUNK = {
            sid: sid,
            type: CAMPFrameType.TX_CHUNK,
            txId: txId,
            offset: 2n,
        };
        CAMP_TRANSACTION.PAYLOAD_TX_CHUNK = CAMPBuffer.alloc(1024).fill(200);
    })

    it("serializes tx_finish", () => {
        expect(() => CAMP_TRANSACTION.FRAME_TX_FINISH = impl.TXFinishFrame.Serialize(sid, 0, txId)).to.not.throw();
        CAMP_TRANSACTION.MSG_TX_FINISH = {
            ack: 0,
            sid: sid,
            type: CAMPFrameType.TX_FINISH,
            txId: txId
        };
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
        };
    });

    it("Serializes tx_cancel", () => {
        expect(() => CAMP_TRANSACTION.FRAME_TX_CANCEL = impl.TXCancelFrame.Serialize(sid, 0, 0xff)).to.not.throw();
        CAMP_TRANSACTION.MSG_TX_CANCEL = {
            ack: 0,
            sid: sid,
            txId: 0xff,
            type: CAMPFrameType.TX_CANCEL
        };
    });
});

describe("Namespace: CAMP.Base Deserialization", function () {
    it("deserializes endpoint info", () => expect(EndpointInfoFrame.Deserialize(CAMP_BASE.FRAME_ENDPOINT_INFO)).to.deep.equal(CAMP_BASE.MSG_ENDPOINT_INFO, "ENDPOINT_INFO"));
    it("deserializes bye", () => expect(ByeFrame.Deserialize(CAMP_BASE.FRAME_BYE)).to.deep.equal(CAMP_BASE.MSG_BYE, "BYE"));
    it("deserializes ack", () => expect(ACKFrame.Deserialize(CAMP_BASE.FRAME_ACK)).to.deep.equal(CAMP_BASE.MSG_ACK, "ACK"));
    it("deserializes error", () => expect(ErrorFrame.Deserialize(CAMP_BASE.FRAME_ERROR)).to.deep.equal(CAMP_BASE.MSG_ERROR, "ERROR"));
    it("deserializes ping_pong", () => expect(PingPongFrame.Deserialize(CAMP_BASE.FRAME_PING_PONG)).to.deep.equal(CAMP_BASE.MSG_PING_PONG, "PING_PONG"));
    it("deserializes utf8data", () => expect(Utf8DataFrame.Deserialize(CAMP_BASE.FRAME_UTF8DATA)).to.deep.equal(CAMP_BASE.MSG_UTF8DATA, "UTF8DATA"));
    it("deserializes binarydata", () => {
        const result = BinaryDataFrame.Deserialize(CAMP_BASE.FRAME_BINARYDATA);

        //Compare payload separately
        expect(result.payload.toString("hex")).to.equal(CAMP_BASE.PAYLOAD_BINARYDATA.toString("hex"));
        expect(strip(result, "payload")).to.deep.equal(CAMP_BASE.MSG_BINARYDATA);
    });
});

describe("Namespace: CAMP.Transaction Deserialization", function () {
    it("deserializes tx_start", () => expect(TXStartFrame.Deserialize(CAMP_TRANSACTION.FRAME_TX_START)).to.deep.equal(CAMP_TRANSACTION.MSG_TX_START));
    it("deserializes tx_chunk", () => {
        const result = TXChunkFrame.Deserialize(CAMP_TRANSACTION.FRAME_TX_CHUNK);

        //Compare payload separately
        expect(result.payload.toString("hex")).to.equal(CAMP_TRANSACTION.PAYLOAD_TX_CHUNK.toString("hex"));
        expect(strip(result, "payload")).to.deep.equal(CAMP_TRANSACTION.MSG_TX_CHUNK);
    });
    it("deserializes tx_finish", () => expect(TXFinishFrame.Deserialize(CAMP_TRANSACTION.FRAME_TX_FINISH)).to.deep.equal(CAMP_TRANSACTION.MSG_TX_FINISH));
    it("deserializes tx_fetch", () => expect(TXFetchFrame.Deserialize(CAMP_TRANSACTION.FRAME_TX_FETCH)).to.deep.equal(CAMP_TRANSACTION.MSG_TX_FETCH));
    it("deserializes tx_cancel", () => expect(TXCancelFrame.Deserialize(CAMP_TRANSACTION.FRAME_TX_CANCEL)).to.deep.equal(CAMP_TRANSACTION.MSG_TX_CANCEL));
});