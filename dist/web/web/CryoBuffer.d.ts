export declare class CryoBuffer {
    buffer: Uint8Array;
    private view;
    constructor(buffer: Uint8Array);
    static alloc(length: number): CryoBuffer;
    static from(input: string, encoding?: "utf8" | "hex"): CryoBuffer;
    static concat(buffers: CryoBuffer[]): CryoBuffer;
    fill(value: number): this;
    writeUInt32BE(value: number, offset: number): void;
    writeInt32BE(value: number, offset: number): void;
    readInt32BE(offset: number): number;
    writeBigUInt64BE(value: bigint, offset: number): void;
    writeUint8(value: number, offset: number): void;
    readUInt32BE(offset: number): number;
    readBigUInt64BE(offset: number): bigint;
    readUint8(offset: number): number;
    write(text: string, offset?: number): void;
    set(buffer: CryoBuffer, offset: number): void;
    toString(encoding?: "utf8" | "hex"): string;
    subarray(start: number, end?: number): CryoBuffer;
    copy(target: CryoBuffer, target_start?: number): void;
    get byteLength(): number;
}
//# sourceMappingURL=CryoBuffer.d.ts.map