# Sudoo-Exif-Node

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-Exif-Node.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-Exif-Node)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Exif-Node/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Exif-Node)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fexif-node.svg)](https://www.npmjs.com/package/@sudoo/exif-node)
[![downloads](https://img.shields.io/npm/dm/@sudoo/exif-node.svg)](https://www.npmjs.com/package/@sudoo/exif-node)

:camera: Exif for Node

## Install

```sh
yarn add @sudoo/exif-node
yarn add @sudoo/geometry @sudoo/immutable @sudoo/io # As peer dependencies
# or
npm install @sudoo/exif-node --save
npm install @sudoo/geometry @sudoo/immutable @sudoo/io --save # As peer dependencies
```

## Example

```ts
import { ExifNode } from "@sudoo/exif";
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
})();
```

## Reference

> Built on <https://github.com/SudoDotDog/Sudoo-Exif>
