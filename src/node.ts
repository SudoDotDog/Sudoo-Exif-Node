/**
 * @author WMXPY
 * @namespace Exif_Node
 * @description Exif
 */

import { Exif } from "@sudoo/exif";
import { readBufferFile, writeBufferFile } from "@sudoo/io";

export class ExifNode extends Exif {

    public static attemptFromBinaryString(binaryString: string): ExifNode | null {

        try {
            return this.fromBinaryString(binaryString);
        } catch (err) {
            return null;
        }
    }

    public static fromBinaryString(binaryString: string): ExifNode {

        try {
            return new ExifNode(binaryString);
        } catch (err) {
            throw new Error('[Sudoo-Exif-Node] Invalid Image Data');
        }
    }

    public static attemptFromBase64(base64: string): ExifNode | null {

        const splited: string[] = base64.split(',');
        if (splited.length === 2) {
            const splitedData: Buffer = Buffer.from(splited[1], 'base64');
            return this.attemptFromBuffer(splitedData);
        }

        const data: Buffer = Buffer.from(base64, 'base64');
        return this.attemptFromBuffer(data);
    }

    public static fromBase64(base64: string): ExifNode {

        const splited: string[] = base64.split(',');
        if (splited.length === 2) {
            const splitedData: Buffer = Buffer.from(splited[1], 'base64');
            return this.fromBuffer(splitedData);
        }

        const data: Buffer = Buffer.from(base64, 'base64');
        return this.fromBuffer(data);
    }

    public static attemptFromBuffer(image: Buffer): ExifNode | null {

        const data: string = image.toString('binary');
        return this.attemptFromBinaryString(data);
    }

    public static fromBuffer(image: Buffer): ExifNode {

        const data: string = image.toString('binary');
        return this.fromBinaryString(data);
    }

    public static async loadFromFile(path: string): Promise<ExifNode> {

        const result: Buffer = await readBufferFile(path);
        return this.fromBuffer(result);
    }

    private constructor(data: string) {

        super(data);
    }

    public toBase64(): string {

        return this.toBuffer().toString('base64');
    }

    public toBase64WithType(type: string): string {

        const actualType: string = type === 'jpg' ? 'jpeg' : type;

        const header: string = `image/${actualType};base64,`;
        return header + this.toBase64();
    }

    public toBuffer(): Buffer {

        return Buffer.from(this._imageData, 'binary');
    }

    public async saveAsFile(path: string): Promise<void> {

        await writeBufferFile(path, this.toBuffer());
        return;
    }
}
