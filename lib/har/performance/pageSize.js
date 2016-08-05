'use strict';
let util = require('../util');

module.exports = {
  id: 'pageSize',
  title: '总页面大小不应该过大',
  description: '避免页面传输大于2 MB (桌面端) / 1 MB (移动端)，因为这将降低页面性能并占用用户网络带宽。',
  weight: 3,
  tags: ['performance', 'mobile'],
  processPage: function(page, domAdvice, options) {
    let sizeLimit = options.mobile ? 1000000 : 2000000;
    if (page.transferSize > sizeLimit) {
      return {
        score: 0,
        offending: [],
        advice: '页面传输大小为' + util.formatBytes(page.transferSize) + '，大于coach给定的上限 ' + util.formatBytes(sizeLimit) + '。 这很 ' + (page.transferSize > 5000000 ? '疯狂' : '大') +  '，你需要精简它。'
      };
    }
    return {
      score: 100,
      offending: [],
      advice: ''
    };
  }
};
