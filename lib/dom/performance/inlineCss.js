(function() {
  'use strict';
  var message = '';
  var score = 0;
  var offending = [];

  var cssFilesInHead = util.getCSSFiles(document.head);
  var styles = Array.prototype.slice.call(window.document.head.getElementsByTagName('style'));

  // if we use HTTP/2, do CSS request in head and inline CSS
  if (util.isHTTP2() && cssFilesInHead.length > 0 && styles.length > 0) {
    score += 5;
    message = '该页面使用HTTP2，同时存在css文件和style标签。 如果你的服务器支持推送，确保使用服务器推送CSS文件.如果大量用户连接较慢，使用内联是更好的选择。 请自行测试并查看瀑布图。';
  }

  // If we got inline styles with HTTP/2 recommend that we push CSS responses instead if  ...
  else if (util.isHTTP2() && styles.length > 0 && cssFilesInHead.length === 0) {
    message += '该页面有内联样式并使用HTTP/2。如果大量用户连接较慢，使用内联是更好的选择，否则如果你的服务器支持推送，请使用服务器推送单独的CSS文件。'
  }

  // we have HTTP/2 and do CSS requests in HEAD.
  else if (util.isHTTP2() && cssFilesInHead.length > 0) {
    message += '如果你的服务器支持推送，则确保把CSS请求放在文档头部，否则请使用内联样式。'
  }

  // If we have HTTP/1
  if (!util.isHTTP2()) {
    // and files served inside of head, let inline them instead
    if (cssFilesInHead.length > 0 && styles.length === 0) {
      score += 10 * cssFilesInHead.length;
      message = '该页面头部有 ' + cssFilesInHead.length + ' 个CSS请求，请内联关键样式并懒加载其余的CSS。';
      offending.push.apply(offending, cssFilesInHead);
    }
    // if we inline CSS and request CSS files inside of head
    if (styles.length > 0 && cssFilesInHead.length > 0) {
      score += 10;
      message += '该页面头部同时具有内联样式和 ' + cssFilesInHead.length + ' 个CSS请求。请仅使用内联样式以加快首次渲染速度。';
      offending.push.apply(offending, cssFilesInHead);
    }
  }

  return {
    id: 'inlineCss',
    title: '在HTTP/1上使用内联样式以加快首次渲染',
    description: '在互联网早期内联样式是一个丑陋的做法，但这样做能加快用户首次渲染速度.在使用HTTP/1时应该内联关键CSS，避免CSS请求阻塞渲染，之后懒加载并缓存剩余的CSS。 使用HTTP/2情况会复杂些。如果你的服务器可以做http推送，大量用户连接较慢且需下载大块HTML，那么使用内联是更好的选择，因为服务器上HTML内容优先级高于CSS，所以用户需要先下载HTML，再下载CSS。',
    advice: message,
    score: Math.max(0, 100 - score),
    weight: 7,
    offending: offending,
    tags: ['performance', 'css']
  };
})();
