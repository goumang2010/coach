(function() {
  'use strict';
  var score = 100;
  var message = '';
  var charSet = document.characterSet;
  if (charSet === null) {
    message = '该页面没有字符集。 如果你使用 Chrome/Firefox则一定是没有定义它, 如果你使用其他浏览器，则有可能是浏览器实现问题。';
    score = 0;
  } else if (charSet !== 'UTF-8') {
    message = '你没有使用 UTF-8字符集?';
    score = 50;
  }
  return {
    id: 'charset',
    title: 'document中声明字符集(charset)',
    description: 'Unicode标准 (UTF-8) 覆盖世界上大多数字符, 标点和符号，请使用它。',
    advice: message,
    score: score,
    weight: 2,
    offending: [],
    tags: ['bestpractice']
  };
})();
