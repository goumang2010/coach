(function() {
  'use strict';

  function getMatchingLabel(id, labels) {
    return labels.filter(function(entry) {
      return (entry.for && entry.for === id);
    });
  }

  var labels = Array.prototype.slice.call(window.document.getElementsByTagName('label'));

  var score = 0;
  var offending = [];
  var inputs = Array.prototype.slice.call(window.document.getElementsByTagName('input'));
  inputs.forEach(function(input) {
    if (input.type === 'text' || input.type === 'password' || input.type === 'radio' || input.type === 'checkbox' || input.type === 'search') {

      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
      if (input.parentElement.nodeName != 'LABEL' && (input.id && getMatchingLabel(input.id, labels).length === 0)) {
        score += 10;
      }
    }
  });
  return {
    id: 'labelOnInput',
    title: '表单中的Input应有设置label',
    description: '大多数input、select和textarea元素需要一个关联的label元素来声明他们的目的。唯一例外的是产生按钮的那些, 如重置和提交按钮。 其他的, 如 text, checkbox, password, radio (button), search 等都需要一个label元素。 https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice: score > 0 ? '表单中有' + score/10 + ' 个input标签没有对应的label标签' : '',
    score: Math.max(0, 100 - score),
    weight: 3,
    offending: offending,
    tags: ['accessibility', 'form']
  };

})();
