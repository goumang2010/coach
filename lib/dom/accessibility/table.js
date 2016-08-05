(function() {
  'use strict';

  var tables = Array.prototype.slice.call(window.document.getElementsByTagName('table'));
  var score = 0;
  var offending = [];
  tables.forEach(function(table) {
    // we are missing a caption
    if (table.getElementsByTagName('caption').length === 0) {
      score += 5;
      if (table.id) {
        offending.push(table.id);
      }
    }
    var trs = table.getElementsByTagName('tr');
    if (trs[0] && trs[0].getElementsByTagName('th').length === 0) {
      score += 5;
      if (table.id) {
        offending.push(table.id);
      }
    }

  });

  return {
    id: 'table',
    title: '在table中使用caption和th标签',
    description: '使用caption元素给table添加一个合适的标头或摘要；使用th元素来表示列或行的标头，利用它的作用范围和其他属性来理清关联。 https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice: score > 0 ? '该页面的表格没有caption元素, 请添加一个合适的标头或摘要。':'',
    score: Math.max(0, 100 - score),
    weight: 5,
    offending: offending,
    tags: ['accessibility', 'html']
  };

})();
