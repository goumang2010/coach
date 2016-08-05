(function() {
  'use strict';
  var html = document.getElementsByTagName('html');
  if (html.length > 0) {
    var language = html[0].getAttribute('lang');
    var score = 100;
    var message = '';
    if (language === null) {
      score = 0;
      message = 'HTML标签缺少lang定义，定义它 <html lang="zh"> '
    }
  } else {
    score = 0;
    message = '注意！你的页面没有HTML标签!';
  }

  return {
    id: 'language',
    title: 'document中声明语言',
    description: '根据W3C的推荐标准你应该使用lang标签为每个网页声明主要语言： https://www.w3.org/International/questions/qa-html-language-declarations#basics',
    advice: message,
    score: score,
    weight: 3,
    offending: [],
    tags: ['bestpractice']
  };
})();
