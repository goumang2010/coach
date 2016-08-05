'use strict';
let util = require('../util');

module.exports = {
  id: 'optimalCssSize',
  title: '使每个CSS请求尽量小',
  description: '减小css请求尺寸，使其满足 TCP 窗口大小 14.5 kB。这样可以下载CSS更快，从而更早的渲染页面。',
  weight: 3,
  tags: ['performance', 'css'],

  processPage: function(page) {

    let cssAssets = page.assets.filter((asset) => asset.type === 'css');
    let transferLimit = 14500;
    let score = 100;
    let advice = '';
    let offending = [];

    cssAssets.forEach(function(asset) {
      if (asset.transferSize > transferLimit) {
        score -= 10;
        offending.push(asset.url);
        advice += asset.url + ' 大小为' + util.formatBytes(asset.transferSize) + ' (' + asset.transferSize + ') 这超过了限制： ' + util.formatBytes(transferLimit) + '。'
      }
    });

    if (score < 100) {
      advice += '请尝试精简CSS至14.5 kb内。';
    }

    return {
      score,
      offending,
      advice
    };
  }

};
