Template.option.created = function() {
  console.log("option - created" + new Date().getTime());
}
Template.option.helpers({
  options: function(){
    /** 옵션 필드 생성 **/
    console.log("client - option.js - option - helpers - options - start" + new Date().getTime());
    var options_filed = [ 
      {_id : '1', name : 'all space'},
      {_id : '2',name : 'particular space'}
    ];
    console.log("client - option.js - option - helpers - options - end" + new Date().getTime());
    return options_filed;
  }
});
Template.option.destroyed = function() {};
Template.option.events({
  'click .option_settiong': function(e,t) {
    console.log("client - option.js - click .option_settiong - events - start" + new Date().getTime());
    console.log(this);
    var optionId = Useroption.find();
    if(optionId.count() === 0 ){
      /** 처음 설정이라면 삽입 실행**/
      var user_list = {
        userId: Meteor.userId(),
        notifi_option: $("input[name='option']:checked").val()
      };
      Useroption.insert(user_list,function(err,result){
        /** 유저옵션을 설정하지 않았거나, all space일 경우 **/
        throwError("option setting complete!");
       });
    }else{
      /** 처음이 아니라면, 업데이트 실행 **/
      Useroption.update(optionId.fetch()[0]._id,{$set : { notifi_option : $("input[name='option']:checked").val() } },function(err,result){
        /** 유저옵션을 설정하지 않았거나, all space일 경우 **/
        throwError("option setting complete!");
      });
    }
  }
});
