Template.addbook2.helpers({
	checking: function () {
    /** 체크된 정보가 없다면, 기본적으로 url_input이 체크 **/
    /** 세션으로 해당 데이터 잠시 저장 **/
    if(Session.equals('button',null)){
      Session.set('button',this.data);
      return 'checked';
    }else if(Session.equals('button',this.data)){
      return 'checked';
    }else{
      return '';
    }
	}
});

Template.addbook2.onRendered(function () {
	console.log("addbook2 - onRerendered");
});

Template.addbook2.onDestroyed(function () {
	console.log("addbook2 - onDestroyed");
});
Template.addbook2.onCreated(function() {
	console.log("addbook2 - onCreated");
});

