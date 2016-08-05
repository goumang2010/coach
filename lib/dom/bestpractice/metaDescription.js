(function(util) {
  'use strict';
  var maxLength = 155;
  var score = 100;
  var message = '';
  var metas = Array.prototype.slice.call(document.querySelectorAll('meta[name][content]'));
  metas = metas.filter(util.caseInsensitiveAttributeValueFilter('name', 'description'));

  var description = metas.length > 0 ? metas[0].getAttribute('content') : '';
  if (description.length === 0) {
    message = '页面没有 meta 描述（元描述）.';
    score = 0;
  } else if (description.length > maxLength) {
    message = 'meta 描述过长. 有 ' + description.length + ' 个字符, 推荐最大长度为 ' + maxLength;
    score = 50;
  }

  // http://static.googleusercontent.com/media/www.google.com/en//webmasters/docs/search-engine-optimization-starter-guide.pdf
  // https://d2eeipcrcdle6.cloudfront.net/seo-cheat-sheet.pdf

  return {
    id: 'metaDescription',
    title: 'Meta 描述',
    description: '使用页面描述使其对搜索引擎友好.',
    advice: message,
    score: score,
    weight: 5,
    offending: [],
    tags: ['bestpractice']
  };
})(util);
