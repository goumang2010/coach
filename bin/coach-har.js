#!/usr/bin/env node

'use strict';

let fs = require('fs'),
  yargs = require('yargs'),
  Promise = require('bluebird'),
  path = require('path'),
  stringify = require('json-stable-stringify'),
  harApi = require('../').har;

Promise.promisifyAll(fs);

let options = yargs
  .usage('$0 [options] <har file>')
  .require(1, 'har-file')
  .wrap(yargs.terminalWidth())
  .argv;

fs.readFileAsync(path.resolve(process.cwd(), options._[0]))
  .then(JSON.parse)
  .then(harApi.getPagesFromHar)
  .then((pages) => harApi.runAdvice(pages, harApi.getAllAdvice(), {}))
  .then((results) => {
    console.log(stringify(results, {space: 2}));
    process.exit(0);
  })
  .catch((e) => {
    console.error('Error running advice for har', e);
    process.exit(1);
  });
