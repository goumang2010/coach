(function(util) {
  'use strict';
  var score = 0;
  var offending = [];
  var offendingDomains = [];

  // simplify and only look for css & js spof
  var docDomain = document.domain;

  // do we have any CSS loaded inside of head from a different domain?
  var styles = util.getCSSFiles(document.head);
  styles.forEach(function(style) {
    var styleDomain = util.getHostname(style);
    if (styleDomain !== docDomain) {
      offending.push(style);
      if (offendingDomains.indexOf(styleDomain) === -1) {
        offendingDomains.push(styleDomain);
        score += 10;
      }
    }
  });

  // do we have any JS loaded inside of head from a different domain?
  var scripts = util.getSynchJSFiles(document.head);
  scripts.forEach(function(script) {
    var scriptDomain = util.getHostname(script);
    if (scriptDomain !== docDomain) {
      offending.push(script);
      if (offendingDomains.indexOf(scriptDomain) === -1) {
        offendingDomains.push(scriptDomain);
        score += 10;
      }
    }
  });

  return {
    id: 'spof',
    title: '避免前端单点失败',
    description: '如果某个JS文件、CSS、字体没有取回或是加载缓慢（白屏），加载的页面就会在浏览器中卡住.所以不要在head标签中同步加载第三方的组件。',
    advice: offending.length > 0 ? '该页面头部有' + offending.length + '个请求可能引起 SPOF。异步加载它们或是把其移出文档头部。' : '',
    score: Math.max(0, 100 - score),
    weight: 7,
    offending: offending,
    tags: ['performance', 'css', 'js']
  };
})(util);
