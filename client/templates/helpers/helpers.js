function masonize(callback) {
/** 인스타그램과 동일하게, 벽돌 형식으로 자동반응 **/
  var container = $('#mainContent');
  container.masonry({
    itemSelector: '.item',
    gutter:10
  })
  if(callback){callback()};
}

