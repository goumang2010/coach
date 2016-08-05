'use strict';

module.exports = {
  id: 'fewFonts',
  title: '避免多字体',
  description: '过多的字体会拖慢渲染速度, 若字体未加载完成文字可能会闪光甚至不显示。',
  weight: 2,
  tags: ['performance', 'font'],
  processPage: function(page) {

    const urls = page.assets.filter((asset) => asset.type === 'font').map((asset) => asset.url);

    // only hurt if we got more than one font
    let score = (urls.length > 1) ? (100 - (urls.length * 10) < 0 ? 0 : 100 - (urls.length * 10)) : 100 ;

    return {
      score: score,
      offending: urls,
      advice: score < 100 ? '页面有 ' + urls.length + ' 个字体请求。请确认是否真的需要它们。' : ''
    };
  }
};
