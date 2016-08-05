'use strict';

let types = ['json', 'javascript', 'css', 'image', 'svg', 'font', 'html'];

function processAsset(asset) {
  if (types.indexOf(asset.type) > -1) {
    const cacheControl = asset.headers.response['cache-control'] || '';
    if (cacheControl.indexOf('private') > -1) {
      return 10;
    }
  }
  return 0;
}

module.exports = {
  id: 'privateAssets',
  title: '不要在静态内容上使用私有头',
  description: '如果在内容上设置私有头，表示该内容只针对该用户。 但静态内容可以被每个用户缓存和使用，所以要避免设置头部私有。',
  weight: 5,
  tags: ['performance', 'server'],
  processPage: function(page) {
    let advice = '';
    let score = 100;
    let offending = [];
    page.assets.forEach(function(asset) {

      let myScore = processAsset(asset);
      if (myScore > 0 && page.url !== asset.url) {
        score -= myScore;
        offending.push(asset.url);
      } else if (myScore > 0 && page.url === asset.url) {
        offending.push(asset.url);
        advice = '主页面有私有头。某些情况这是正确的，如用户登录才可访问特定内容，但若是静态共用的，请不要设置private。';
      }

    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? '页面有 ' + offending.length + ' 个请求有私有头。 ' + advice + '确保该资源的私有的并针对特定用户，否则将被所有用户缓存。' : advice
    }
  }
};
