(function(util) {
  'use strict';

  var images = Array.prototype.slice.call(window.document.getElementsByTagName('img'));
  var score = 0;
  var offending = [];
  var missing = 0;
  var tooLong = 0;
  var advice = '';
  var unique = {};

  images.forEach(function(image) {
    if (!image.alt || image.alt === '') {
      score+=10;
      missing++;
      if (image.src) {
        offending.push(image.src);
        unique[image.src] = 1;
      }
    }
    //  because of restrictions within the JAWS screen reader
    else if (image.alt && image.alt.length>125) {
      score+=5;
      offending.push(image.src);
      tooLong++;
    }
  });

  if (missing>0) {
    advice = '该页面有' + missing + ' 个img标签缺少alt属性，其中' + Object.keys(unique).length + '个img标签是唯一（非重复）的。'
  }
  if (tooLong>0) {
    advice += '该页面有' + tooLong + ' 个img标签alt属性文本过长 (长于125个字符)。'
  }

  return {
    id: 'altImages',
    title: 'img标签一定要添加alt属性',
    description: '所有的img标签都需要alt属性，这条规则没有例外。如果没有，则请马上加上它。 https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice: advice,
    score: Math.max(0, 100 - score),
    weight: 5,
    offending: offending,
    tags: ['accessibility','images']
  };

})(util);
