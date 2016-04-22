Template.addbook.created = function() {
  /** 각 세션 초기화 **/
  console.log("addbook - created" + new Date().getTime());
  Session.setDefault('addbookErrors', {});
  Session.setDefault('button',null);
}
Template.addbook.helpers({
  categories: function() {
    var categories_filed = [ 
      {_id : '1', name : 'url_input', data:'url'},
      {_id : '2',name : 'image_input',data:'image' }
    ];
    return categories_filed;
  },
  url_flag : function(){
    /** 버튼이 세션에 저장된 내용이 url과 같으면 url_flag를 true설정하여 URL_input 페이지를 보여준다 **/
    return Session.equals('button','url')? true : false;
  }
});
Template.addbook.events({
  'click input[name=category]': function(e) {
    /** 체크한 라디오박스의 data-input 값을 얻어, 세션에 저장 **/
    console.log("-----addbook-click-events----");
    Session.set('button',e.currentTarget.getAttribute('data-input'));
  }
});
Template.addbook.destroyed = function() {
  console.log("-----addbook-destroyed----");
};
