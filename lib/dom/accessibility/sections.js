(function() {
  'use strict';
  var headings = ['h6', 'h5', 'h4', 'h3', 'h2', 'h1'];
  var score = 0;
  var message = '';
  var sections = Array.prototype.slice.call(window.document.getElementsByTagName('section'));
  var totalSections = sections.length;

  if (totalSections === 0) {
    message = '页面中没有使用sections，你应该使用它使你的内容更结构化。';
    score = 100;
  } else {
    sections.forEach(function(section) {
      var hasHeading = false;
      headings.forEach(function(heading) {
        var tags = Array.prototype.slice.call(section.getElementsByTagName(heading));
        if (tags.length > 0) {
          hasHeading = true;
        }
      });
      if (!hasHeading) {
        score += 10;
      }
    })
    if (score > 0) {
    message = '该页面section标签下没有h标签，发生了 ' + score/10 + ' 次。';
    }
  }

  return {
    id: 'sections',
    title: '在section标签中使用h标签来增强页面结构化',
    description: 'Section标签应该至少有一个直接子级h元素。',
    advice: message,
    score: Math.max(0, 100 - score),
    weight: 0,
    offending: [],
    tags: ['accessibility', 'html']
  };

})();
