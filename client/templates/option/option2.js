Template.option2.helpers({
	checking: function () {
    /** 라디오버튼에 check되어있는 것을 표시하기위함 **/
    console.log("client - option2.js - option2 - helpers - checking - start" + new Date().getTime());
    if(Useroption.find().count() === 0 ){
      /** 설정한 적이 없다면, all에 check표시 **/
      if(this._id==='1')  return 'checked'
      else                return '';
    }else{
      /** 설정한 적이 있다면, 유저가 설정한 옵션에 표시 **/
      return Useroption.find().fetch()[0].notifi_option === this.name ? 'checked' : '';
    }
	}
});

Template.option2.onRendered(function () {
    console.log("-------------------------------------------------------------------------");
    console.log("client - option2.js - option2 - onRendered - start" + new Date().getTime());
});

Template.option2.onDestroyed(function () {
    console.log("-------------------------------------------------------------------------");
    console.log("client - option2.js - option2 - onDestroyed - start" + new Date().getTime());
});
Template.option2.onCreated(function() {
    console.log("-------------------------------------------------------------------------");
    console.log("client - option2.js - option2 - onCreated - start" + new Date().getTime());
});
