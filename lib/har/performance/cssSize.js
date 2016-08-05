'use strict';
let util = require('../util');

module.exports = {
  id: 'cssSize',
  title: 'CSS大小不应过大',
  description: '传递大的CSS给浏览器会增加解析时间，拖慢渲染速度。 请仅发送页面所需的CSS，并移除不再使用的CSS规则。',
  weight: 5,
  tags: ['performance', 'css'],

  processPage: function(page, domAdvice, options) {

    let cssAssets = page.assets.filter((asset) => asset.type === 'css');
    let transferSize = 0;
    let contentSize = 0;
    let transferLimit = 120000;
    let contentLimit = 400000;
    let score = 100;
    let advice = '';

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

    if (score < 100) {
      advice = '总CSS传输尺寸为 ' + util.formatBytes(transferSize) + (contentSize > transferSize ? ' 非压缩尺寸为 ' + util.formatBytes(contentSize): '') + '。';

      if (contentSize > 1000000 && options.mobile) {
        advice+= 'CSS文件总大小已超过1MB，不适合再移动端显示。';
      } else if (contentSize > 2000000) {
        advice+= 'CSS文件总大小已超过2MB，请修改。';
      }
      else {
        advice+= '请尝试缩小css文件。'
      }
    }

    return {
      score,
      offending: [],
      advice
    };
  }

};
