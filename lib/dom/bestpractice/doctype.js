(function() {
  'use strict';

  var score = 100;
  var message = '';
  var docType = document.doctype;

  if (docType === null) {
    message = '页面没有doctype. 请使用<!DOCTYPE html>.';
    score = 0;
  } else if (!(docType.name.toLowerCase() === 'html' && (docType.systemId === '' || docType.systemId.toLowerCase() === 'about:legacy-compat'))) {
    message = '珍爱生命使用HTML5 doctype 声明: <!DOCTYPE html>';
    score = 25;
  }

  return {
    id: 'doctype',
    title: 'document中声明doctype',
    description: '<!DOCTYPE> 声明不是HTML标签，它是一条给浏览器指令，指示页面采用的是哪个版本的HTML。',
    advice: message,
    score: score,
    weight: 2,
    offending: [],
    tags: ['bestpractice']
  };

})();
