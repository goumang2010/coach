'use strict';

module.exports = {
  id: 'favicon',
  title: '图标应该小且能够缓存',
  description: '把图标做小，并加上长时间（大于30天）的缓存头。',
  weight: 1,
  tags: ['performance', 'favicon'],

  processPage: function(page, domAdvice, options) {
    let total = 0;
    let offending = [];
    let doWeHaveAFavicon = false;
    let advice = '';
    page.assets.forEach(function(asset) {
      if (asset.type === 'favicon') {
        if (asset.status >= 299) {
          total += 100;
          advice += 'The favicon returned ' + asset.status + '. ';
        }
        if (asset.size > 2000) {
            total += 50;
            advice += '图标大小大于 ' + asset.size + ' bytes。这已经很大了，请尝试把它做小。';
        }
        if (asset.expires <= 0) {
            total += 50;
            advice += '图标未设置缓存时间。 ';
        }
        if (total > 0) {
            offending.push(asset.url);
        }
        doWeHaveAFavicon = true;
      }
    });

    // The Favicon check doesn't work in Chrome because of
    // https://github.com/sitespeedio/coach/issues/49
    if (!doWeHaveAFavicon && options.browser === 'chrome') {
      total = 100;
      advice = 'The page is missing a favicon.';
    }

    return {
      score: Math.max(0, 100 - total),
      offending: offending,
      advice: advice
    }
  }
};
