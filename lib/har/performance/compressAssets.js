'use strict';

let types = ['html', 'plain', 'json', 'javascript', 'css', 'svg'];

function processAsset(asset) {
  if (types.indexOf(asset.type) > -1) {
    const encoding = asset.headers.response['content-encoding'] || '';
    if (encoding !== 'gzip' && encoding !== 'br' && encoding !== 'deflate' && asset.contentSize > 2000) {
      return 10;
    }
  }
  return 0;
}

module.exports = {
  id: 'compressAssets',
  title: '压缩文本内容',
  description: '互联网早期，浏览器不支持压缩文本内容 (gzipping)。现在则需要压缩 HTML, JSON, Javacript, CSS and SVG这样可以减少流量、使页面更快、节省网络带宽。',
  weight: 8,
  tags: ['performance', 'server'],

  processPage: function(page) {
    let score = 100;
    let offending = [];
    page.assets.forEach(function(asset) {
      let myScore = processAsset(asset);
      if (myScore > 0) {
        score -= myScore;
        offending.push(asset.url);
      }
    });

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: score < 100 ? '该页面有 ' + offending.length + ' 个请求服务器没有压缩，压缩它们可以节省很多资源。' : ''
    }
  }
};
