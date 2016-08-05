(function(util) {
  'use strict';
  var message = '',
    score = 0,
    offending = [],
    styles = util.getCSSFiles(document.head),
    scripts = util.getSynchJSFiles(document.head),
    docDomain = document.domain,
    domains = [],
    blockingCSS = 0,
    blockingJS = 0,
    // TODO do the preconnect really matter when you are inside of head?
    preconnects = util.getResourceHintsHrefs('preconnect'),
    preconnectDomains = preconnects.map(function(preconnect) {
    return util.getHostname(preconnect);
  });

  function testByType(assetUrl) {
    var domain = util.getHostname(assetUrl);
    // if it is from different domain or not
    if (domain !== docDomain) {
      offending.push(assetUrl);
      // is this the first time this domain is used?
      if (!util.exists(domain, domains)) {
        // hurt depending on if it's preconnected or not
        score += util.exists(domain, preconnectDomains) ? 5 : 10;
        domains.push(domain);
      }
      score += 5;
    } else {
      offending.push(assetUrl);
      score += 5;
    }
  }

  // TODO do we have a way to check if we different domains act as one for H2?
  // know we don't even check it
  if (util.isHTTP2()) {
    if (styles.length > 0) {
      message = '确保使用服务器推送CSS来达到快速渲染。 ';
      // check the size
      styles.forEach(function(url) {
        if (util.getTransferSize(url) > 14500) {
          offending.push(url);
          score += 5;
          blockingCSS++;
          message += '样式文件' + url + ' 超过TCP窗口大小 14.5 kB。确保文件小于它以保证快速渲染。 '
        }

      })
    }
    if (scripts.length > 0) {
      score += scripts.length * 10;
      scripts.forEach(function(url) {
        offending.push(url);
        blockingJS++;
      });
      message += '避免在文档头部加载同步js文件，你不应该需要js文件来渲染页面！';
    }
  }
  // we are using HTTP/1
  else {
    styles.forEach(function(style) {
      testByType(style);
    });
    blockingCSS = styles.length;
    scripts.forEach(function(script) {
      testByType(script);
    });
    blockingJS = scripts.length;

  }

  if (offending.length > 0) {
    message += '页面头部有 ' + blockingCSS + ' 个阻塞CSS请求和 ' + blockingJS + ' 个阻塞JS请求。';
  }


  return {
    id: 'fastRender',
    title: '避免拖慢关键渲染路径',
    description: '关键渲染路径是指浏览器渲染页面的主要路径。每个在head元素中请求的文件将会延迟页面的渲染，因为浏览器要先处理这些文件请求。避免在head中使用js (你不应该需要用js来渲染页面)，请求的文件应该与主文档同域名 (避免DNS查询)，使用内联 CSS 或服务器推送达到快速渲染和缩短渲染路径的目的。',
    advice: message,
    score: Math.max(0, 100 - score),
    weight: 10,
    offending: offending,
    tags: ['performance']
  };
})(util);
