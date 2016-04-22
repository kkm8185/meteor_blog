Template.notifications.helpers({
  notifications: function() {
    /** 읽지 않은 알림 불러온다 **/
    console.log("notifications.js - notifications - helpers - notifications");
    return Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
    console.log("notifications.js - notifications - helpers - notificationCount");
    if(Useroption.find().count() === 0 || Useroption.find().fetch()[0].notifi_option === "all space" ){
      /** 유저옵션을 설정하지 않았거나, all space일 경우, 읽지않은 알림 숫자 반환 **/
      return Notifications.find({userId: Meteor.userId(), read: false}).count();
    }else if(Useroption.find().fetch()[0].notifi_option === "particular space"){
      /** particular space면서, 현 라우터가 books일 경우, 해당 카테고리의 읽지 않은 알림 숫자 반환 **/
      if(Router.current().route.getName() === "books"){
        return Notifications.find({userId: Meteor.userId(), category : Session.get('category'), read: false}).count();
      }
    }
  }
});

Template.notificationItem.helpers({
  commenterName : function(){
    /** 좋아요 누른 사람의 이름 **/
    console.log("notifications.js - notifications - helpers - commenterName");
    console.log(this);
    return this.likername;
  },
  notificationPostPath: function() {
    /** 좋아요 누른 곳의 해당 경로로 이동 **/
    console.log("notifications.js - notificationItem - helpers - notificationPostPath");
    return Router.routes.viewbook.path({name: this.category, _id : this.bookId});
//    return Router.go('books', {name: Session.get('category')});  
  }
});

Template.notificationItem.events({
  'click a': function() {
    /** 읽지 않은 알림을 클릭한다면, 읽음 처리로 변경 **/
    console.log("notifications.js - notificationItem - click a - event");
    Notifications.update(this._id, {$set: {read: true}});
  }
});
