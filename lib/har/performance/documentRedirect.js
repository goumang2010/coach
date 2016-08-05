'use strict';

module.exports = {
  id: 'documentRedirect',
  title: '避免主文档重定向',
  description: '除非是http重定向至https，否则不要使用页面重定向。',
  weight: 9,
  tags: ['performance'],
  processPage: function(page) {
    let score = page.documentRedirects > 0 ? 0 : 100;
    let advice = page.documentRedirects > 0 ? '主文档重定向 ' + page.documentRedirects + ' 次，去除这些重定向使得页面速度更快。' : '';
    // if a HTTP redirects to HTTPS don't hurt that because that is
    // really nice :)
    if (page.documentRedirects === 1 && page.url !== page.finalUrl) {
       // do we redirect to an HTTP page?
       if (page.url.indexOf('http:')> -1 && page.finalUrl.indexOf('https') > -1) {
         advice = '页面从HTTP 重定向至 HTTPS, 很好。';
         score = 100;
       }
    }

    return {
      score: score,
      offending: page.redirectChain,
      advice : advice
    };
  }
};
