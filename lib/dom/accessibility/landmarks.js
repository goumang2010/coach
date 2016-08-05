(function() {
  'use strict';

  var landmarks = ['article','aside','footer','header','nav','main'];
  var totalLandmarks = 0;
  landmarks.forEach(function(landmark) {
      totalLandmarks += Array.prototype.slice.call(window.document.getElementsByTagName(landmark)).length;
  });

  return {
    id: 'landmarks',
    title: '使用地标来结构化你的内容',
    description: '地标是 article, aside, footer, header, nav 或main标签。适当的添加这些地标能够使页面更易于理解，帮助用户更家容易的操作内容。 https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/',
    advice: totalLandmarks === 0 ? '页面没有用到任何地标' : '',
    score:  totalLandmarks > 0 ? 100 : 0,
    weight: 5,
    offending: [],
    tags: ['accessibility','html']
  };

})();
