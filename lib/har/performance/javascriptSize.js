'use strict';
let util = require('../util');

module.exports = {
  id: 'javascriptSize',
  title: '总JS大小不应过大',
  description: '大量JS意味着可能下载了很多用户并不需要的，确定页面的复杂性，和是否使用了多套JS框架?',
  weight: 5,
  tags: ['performance', 'javascript'],

  processPage: function(page) {
    let cssAssets = page.assets.filter((asset) => asset.type === 'javascript');
    let transferSize = 0;
    let contentSize = 0;
    let transferLimit = 120000;
    let contentLimit = 500000;
    let score = 100;

    cssAssets.forEach(function(asset) {
      transferSize += asset.transferSize;
      contentSize += asset.contentSize;
    });

    if (transferSize > transferLimit) {
      score -= 50;
    }

    if (contentSize > contentLimit) {
      score -= 50;
    }

    return {
      score: score,
      offending: [],
      advice: score < 100 ? '总共JS传输大小为 ' + util.formatBytes(transferSize) + (contentSize > transferSize ? ' 未压缩的大小为 ' + util.formatBytes(contentSize): '') +
       '。' + (contentSize > 1000000 ? 'crazy! ' : '已很大了，') + '你需要精简JS。' : ''
    };
  }

};
