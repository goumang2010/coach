'use strict';
let util = require('../util');

const SKIPPABLE_DOMAINS = ['www.google-analytics.com', 'ssl.google-analytics.com', 'analytics.twitter.com'];


module.exports = {
  id: 'cacheHeaders',
  title: '通过设置缓存头来避免额外的请求',
  description: '提高页面速度的最好办法就是不要请求服务器。在服务器响应上面设置一个缓存头可以让浏览器在设定的缓存时间内不再重复下载资源。',
  weight: 30,
  tags: ['performance', 'server'],

  processPage: function(page) {
    let score = 100;
    let offending = [];
    let saveSize = 0;
    page.assets.forEach(function(asset) {
      // Don't check the main page/document since it is common to not
      // cache that
      if (asset.url === page.finalUrl) {
        return;
      }

      if (SKIPPABLE_DOMAINS.indexOf(util.getHostname(asset.url)) === -1 && asset.expires <= 0) {
        // TODO we should check if the asset is set private, think the most logical would be to exclude them
        score -=10;
        saveSize += asset.transferSize;
        offending.push(asset.url);
      }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? '该页面有 ' + offending.length + ' 请求没有设置缓存时间。 设置一个缓存时间，这样浏览器就不需要每次都下载， 这在下次进入该页面时将节省 ' + util.formatBytes(saveSize) + '。' : ''
    }
  }
};
