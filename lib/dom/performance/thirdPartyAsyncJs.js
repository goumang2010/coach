(function(util) {
  'use strict';
  var patterns = [
    'ajax.googleapis.com',
    'apis.google.com',
    '.google-analytics.com',
    'connect.facebook.net',
    'platform.twitter.com',
    'code.jquery.com',
    'platform.linkedin.com',
    '.disqus.com',
    'assets.pinterest.com',
    'widgets.digg.com',
    '.addthis.com',
    'code.jquery.com',
    'ad.doubleclick.net',
    '.lognormal.com',
    'embed.spotify.com'
  ];

  function is3rdParty(url) {
    var hostname = util.getHostname(url);
    var re;
    for (var i = 0; i < patterns.length; i++) {
      re = new RegExp(patterns[i]);
      if (re.test(hostname)) {
        return true;
      }
    }
    return false;
  }
  var score = 0;
  var offending = [];
  var scripts = util.getSynchJSFiles(document);

  for (var i = 0, len = scripts.length; i < len; i++) {
    if (is3rdParty(scripts[i])) {
        offending.push(scripts[i]);
        score += 10;
    }
  }

  return {
    id: 'thirdPartyAsyncJs',
    title: '异步加载第三方JS插件',
    description: '使用异步加载的JS切片能够加快速度，提高用户体验，避免阻塞渲染.',
    advice: offending.length > 0 ? '该页面有 ' + offending.length + ' 个同步第三方JS请求，把它们替换为异步请求.': '',
    score: Math.max(0, 100 - score),
    weight: 5,
    offending: offending,
    tags: ['performance','js']
  };
})(util);
