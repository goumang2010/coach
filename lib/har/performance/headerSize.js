'use strict';
let util = require('../util');

module.exports = {
  id: 'headerSize',
  title: '请求头不应过大[HTTP/1]',
  description: '使用HTTP/1时避免大量cookie和其他东西使得请求头过大，因为请求头是不压缩的，你会发送多余的东西给用户',
  weight: 4,
  tags: ['performance', 'mobile'],
  processPage: function(page) {

    // H2 sends headers compressed and we don't get the right size now
    // so it's better just to skip those
    if (util.isHTTP2(page)) {
      return {
        score: 100,
        offending: [],
        advice: '该页面使用HTTP/2 连接，请求头已压缩，很好。当前版本的coach不能判断头部体积是否过大。'
      };
    } else {

    let limit = 20000;
    let score = 100;
    let offending = [];
    page.assets.forEach(function(asset) {
      if (asset.headerSize > limit) {
        offending.push(asset.url);
        score -= 10;
      }
    });
    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? '该页面有 ' + offending.length + ' 个请求头部大于 ' + util.formatBytes(limit) + '。你应该试图减少发送的cookie。' : ''
    };
  }
  }
};
