'use strict';
let util = require('../util');

var redirect = [301, 302, 303, 305, 306, 307];

function isRedirect(asset) {
  return redirect.indexOf(asset.status) > -1;
}

module.exports = {
  id: 'assetsRedirects',
  title: '避免重定向',
  description: '重定向对于用户下载资源来说是一个额外的步骤。避免重定向使得页面加载更快并且防止移动端卡住。',
  weight: 2,
  tags: ['performance'],
  processPage: function(page) {
    let score = 100;
    let offending = [];
    let sameDomainAsDocument = 0;
    page.assets.forEach(function(asset) {
      // skip the main document if that is redirected
      // it's caught the ine documentRedirect advice
      if (page.url !== asset.url && isRedirect(asset)) {
          offending.push(asset.url);
          score -= 10;
          if (page.baseDomain === util.getHostname(asset.url)) {
            sameDomainAsDocument++;
          }
        }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? '页面有 ' + offending.length + ' 个重定向。其中' +  (sameDomainAsDocument > 0 ? sameDomainAsDocument + ' 个是来自主域名的，请修复它们 ' : '') + (offending.length > sameDomainAsDocument ? (offending.length - sameDomainAsDocument) + '个请求来自其他域名，它们可能是根本需要做重定向的第三方插件:(' : ''): ''
    }
  }
};
