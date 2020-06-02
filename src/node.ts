/**
 * @author WMXPY
 * @namespace Exif_Node
 * @description Exif
 */

import { readBufferFromPath, writeBufferToPath } from "./util";
import { Exif } from "@sudoo/exif";

export class ExifNode extends Exif {

    public static fromBinaryString(binaryString: string): ExifNode {

        return new ExifNode(binaryString);
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

    public static fromBuffer(image: Buffer): ExifNode {

        const data: string = image.toString('binary');
        return new ExifNode(data);
    }

    public static async loadFromFile(path: string): Promise<ExifNode> {

        const result: Buffer = await readBufferFromPath(path);
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

        await writeBufferToPath(path, this.toBuffer());
        return;
    }
}
