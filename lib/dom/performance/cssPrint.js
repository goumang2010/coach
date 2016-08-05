(function(util) {
  'use strict';
  var offending = [];

  var links = document.getElementsByTagName('link');
  for (var i = 0, len = links.length; i < len; i += 1) {
    if (links[i].media === 'print') {
      offending.push(util.getAbsoluteURL(links[i].href));
    }
  }

  var score = offending.length * 10;

  return {
    id: 'cssPrint',
    title: '不要加载单独的打印样式表',
    description: '打印样式表并不常用，加载单独的打印样式表会拖慢页面性能。你可以使用@media print把打印样式包含在其他CSS文件中。',
    advice: offending.length > 0 ? '页面有 ' + offending.length + ' 个打印样式表。 你应该使用@media print把打印样式包含在其他CSS文件中。':'',
    score: Math.max(0, 100 - score),
    weight: 1,
    offending: offending,
    tags: ['performance', 'css']
  };

})(util);
