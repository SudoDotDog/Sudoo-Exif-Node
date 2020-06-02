/**
 * @author WMXPY
 * @namespace Example
 * @description Example
 */

import { ExifNode } from "../src";

(async () => {

    const exif: ExifNode = await ExifNode.loadFromFile('./example.jpg');

    exif.clear().merge({
        gpsLocation: {
            latitude: 41.878113,
            longitude: -70.6,
        },
    });
    exif.dump();
    await exif.saveAsFile('./out.jpg');

    console.log('finished');
})();
