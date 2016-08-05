(function() {
  'use strict';
  var headings = ['h6', 'h5', 'h4', 'h3', 'h2', 'h1'];
  var score = 0;
  var totalHeadings = 0;
  var message = '';
  headings.forEach(function(heading) {
    totalHeadings += Array.prototype.slice.call(window.document.getElementsByTagName(heading)).length;
  });

  if (totalHeadings === 0) {
    score = 100;
    message = '页面没有标题，请使用标题使你的内容更加结构化。';
  } else {
    var hadLowerHeading = false,
      messages = [];

    headings.forEach(function(heading) {
      var tags = Array.prototype.slice.call(window.document.getElementsByTagName(heading));
      if (hadLowerHeading && tags.length === 0) {
        score += 10;
        messages.push('这个页面没有 ' + heading + '标签，标签的优先级过低。');
      }
      if (tags.length > 0) {
        hadLowerHeading = true;
      }
    });

    message = messages.join(' ');
  }

  return {
    id: 'headings',
    title: '使用h标签来结构化你的页面',
    description: '标题使页面结构清晰，更加有逻辑. 维基百科使用标题来汇集文章，从H1到H6能清晰的向阅读者，搜索引擎等展示该页面的结构。 https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice: message,
    score: Math.max(0, 100 - score),
    weight: 4,
    offending: [],
    tags: ['accessibility', 'html']
  };

})();
