'use strict';
let util = require('../util');

module.exports = {
  id: 'fewRequestsPerDomain',
  title: '避免同域名过多请求[HTTP/1]',
  description: '使用 HTTP/1时，浏览器对每个域名下的并发请求存在限制，当达到限制后请求需要排队发出。',
  weight: 5,
  tags: ['performance', 'HTTP/1'],
  processPage: function(page) {
    let limit = 30;
    if (util.isHTTP2(page))
      return {
        score: 100,
        offending: [],
        advice: 'HTTP/2连接对于请求数几乎没有限制， 但这也不完全正确，取决于下载的是是么。请检查HAR文件查看详情。'
      };

    const infoPerDomain = page.domains;
    let offending = [];
    let domainAndRequests = {};
    let score = 100;
    let advice = '';
    Object.keys(infoPerDomain).reduce((result, domain) => {
      if (infoPerDomain[domain].requests > limit) {
        score -= 10;
        offending.push(domain);
        domainAndRequests[domain] = infoPerDomain[domain].requests;
      }
    });

    if (score < 100) {
      advice = '该页面有 ' + offending.length + ' 个域名发起的超过 30 个请求。';

      Object.keys(domainAndRequests).forEach(function(domain) {
        advice += domain + ' 有 ' + domainAndRequests[domain] + ' 个请求。';
      });
      advice += '通过分片或迁移至HTTP/2提高性能。';
    }


    return {
      score: Math.max(0, score),
      offending: offending,
      advice: advice
    }
  }
};
