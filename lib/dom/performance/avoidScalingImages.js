(function(util) {
  'use strict';
  var message = '';
  var minLimit = 100;
  var score = 0;
  var offending = [];
  var images = Array.prototype.slice.call(document.getElementsByTagName('img'));
  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    // skip images that are 0 (carousel etc)
    if ((img.clientWidth + minLimit) < img.naturalWidth && img.clientWidth > 0) {
      // message = message + ' ' + util.getAbsoluteURL(img.currentSrc) + ' [browserWidth:' + img.clientWidth + ' naturalWidth: ' + img.naturalWidth +']';
      offending.push(util.getAbsoluteURL(img.currentSrc));
      score += 10;
    }
  }

  if (score>0) {
    message = '页面有 ' + (score/10) + ' 个缩放的图片缩小超过 ' + minLimit + ' 像素，最好不要缩放它们。';
  }

  return {
    id: 'avoidScalingImages',
    title: '不要在浏览器中缩放图片',
    description: '缩放图片非常容易，并且可以在不同的设备中显示的很好，然而这种做法不利于性能! 浏览器中缩放图片会占用额外的CPU时间，也将严重的降低移动端的性能。并且用户需要下载额外的数KB甚至数MB的数据。所以不要这样做，确保在服务端创建同一图片的多个版本，以满足不同客户端的需求。',
    advice: message,
    score: Math.max(0, 100 - score),
    weight: 5,
    offending: offending,
    tags: ['performance','image']
  };
})(util);
