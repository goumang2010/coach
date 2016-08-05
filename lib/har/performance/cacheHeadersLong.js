'use strict';
let util = require('../util');

const SKIPPABLE_DOMAINS = ['www.google-analytics.com', 'ssl.google-analytics.com', 'analytics.twitter.com'];

function processAsset(asset) {
  if (SKIPPABLE_DOMAINS.indexOf(util.getHostname(asset.url)) > -1) {
    return 0;
  } else if (asset.expires >= 2592000) {
    return 0;
  } else if (asset.expires <= 0) {
    // this is caught in cacheHeaders so let's skip giving advice
    // about them
    return 0;
  }
  else {
    return 1;
  }
}

module.exports = {
  id: 'cacheHeadersLong',
  title: '设置长的缓存时间',
  description: '设置长的缓存时间 (至少30天) ，这样资源能长期存在浏览器中。 如果静态资源改变了，那么就给它重命名，这样浏览器就会重新下载。',
  weight: 3,
  tags: ['performance', 'server'],

  processPage: function(page) {
    let score = 100;
    let offending = [];
    page.assets.forEach(function(asset) {
      // Don't check the main page/document since it is common to not
      // cache that
      if (asset.url === page.finalUrl) {
        return;
      }
      let myScore = processAsset(asset);
      if (myScore > 0) {
        score -= myScore;
        offending.push(asset.url);
      }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? '该页面有 ' + offending.length + ' 个请求的已设置的缓存时间小于 30 天。' : ''
    }
  }
};
