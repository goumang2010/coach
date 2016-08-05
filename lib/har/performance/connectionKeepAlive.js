'use strict';
let util = require('../util');

module.exports = {
  id: 'connectionKeepAlive',
  title: '不要关闭一个会使用多次的连接',
  description: '使用keep alive标头这样就可以复用同一域名下的连接。 从前的立即关闭连接需要时再打开的说法已经不适用了。',
  weight: 5,
  tags: ['performance', 'server'],
  processPage: function(page) {
    let score = 100;
    let offending = [];
    let avoid = 'doc';

    let closedPerDomain = {};
    page.assets.forEach(function(asset) {
      const connectionHeader = asset.headers.response.connection || '';
      if (asset.type !== avoid && connectionHeader.indexOf('close') > -1) {
        const hostname = util.getHostname(asset.url);
        if (!closedPerDomain[hostname]) {
          closedPerDomain[hostname] = 1;
          // TODO these assets should be reported too
        } else {
          closedPerDomain[hostname] += 1;
          offending.push(asset.url);
          score -= 10;
        }
      }
    });
    return {
      score: Math.max(0, score),
      offending: offending,
      advice : score < 100 ? '该页面有 ' + offending.length + ' 个请求未能复用相同域名的连接。 请使用keep alive复用连接！' : ''
    }
  }
};
