'use strict';
let util = require('../util');

module.exports = {
  id: 'imageSize',
  title: '总图片大小过大',
  description: '避免页面中有过多的大图片。这些图片不会影响页面的绘制，但会占用用户大量网络带宽。',
  weight: 5,
  tags: ['performance', 'image'],

  processPage: function(page) {

    let images = page.assets.filter((asset) => asset.type === 'image' ||  asset.type === 'svg');
    let contentSize = 0;
    let contentLimit = 700000;
    let score = 100;

    images.forEach(function(image) {
      contentSize += image.contentSize;
    });

    if (contentSize > contentLimit) {
      // TODO reduce the score per 100 kb.
      score -= 50;
    }

    return {
      score: score,
      offending: [],
      advice: score < 100 ? '该页面的总图像大小超过 ' + util.formatBytes(contentSize) + '。 这已经很大了，确保你选择了正确的图片格式并已被压缩，可以使用ImageOptim让它们变得更小。' : ''
    };
  }

};
