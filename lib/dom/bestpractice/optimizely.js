(function(util) {
  'use strict';
  var score = 100;
  var scripts = util.getSynchJSFiles(document.head);
  var advice = '';
  var offending = [];
    scripts.forEach(function(script) {
      if (util.getHostname(script) === 'cdn.optimizely.com') {
        offending.push(script);
        score = 0;
        advice = '该页面使用了Optimizely。 请小心使用它因为它会损坏性能，只有你运行A/B测试时再打开Optimzely(= 等同于加载JS).在测试结束后请关闭它。';
      }
    });

  return {
    id: 'optimizely',
    title: '只有需要时才使用Optimizely',
    description: '使用Optimizely会造成性能下降，因为head标签中JS是同步加载, 加载之后才会. 只有你运行A/B测试时再打开Optimzely(= 等同于加载JS)。',
    advice: advice,
    score: score,
    weight: 2,
    offending: offending,
    tags: ['bestpractice']
  };
})(util);
