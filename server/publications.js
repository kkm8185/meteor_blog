/** 카테고리 전체 publish **/
Meteor.publish('categories', function() {
  if(Meteor.isServer){
    console.log("publications.js - categories - server " + new Date().getTime());
  }else if(Meteor.isClient){
    console.log("publications.js - categories - client " + new Date().getTime());
  }
  return Categories.find();
});
/** useroption의 해당 옵션만 publish **/
Meteor.publish('useroption', function(option) {
  if(Meteor.isServer){
    console.log("publications.js - useroption - server " + new Date().getTime());
  }else if(Meteor.isClient){
    console.log("publications.js - useroption - client " + new Date().getTime());
  }
  return Useroption.find({userId : option});
});
/*
Meteor.publish('notifications', function(option) {
  if(Meteor.isServer){
    console.log("publications.js - notifications - server " + new Date().getTime());
  }else if(Meteor.isClient){
    console.log("publications.js - notifications - client " + new Date().getTime());
  }
  return Notifications.find({category : option});
});
*/
/** 알람 전체 publish **/
Meteor.publish('notifications', function() {
  if(Meteor.isServer){
    console.log("publications.js - notifications - server " + new Date().getTime());
  }else if(Meteor.isClient){
    console.log("publications.js - notifications - client " + new Date().getTime());
  }
  return Notifications.find();
});
/** book의 해당 id인 값만 publish **/
Meteor.publish('viewbooks', function(option) {
  if(Meteor.isServer){
    console.log("publications.js - viewbooks - server " + new Date().getTime());
  }else if(Meteor.isClient){
    console.log("publications.js - viewbooks - client " + new Date().getTime());
  }
  console.log(Books.find({_id : option}).fetch());
  return Books.find({_id : option});
});
/** book의 해당 카테고리인 값만 publish **/
Meteor.publish('books', function(option) {
  if(Meteor.isServer){
    console.log("publications.js - books - server " + new Date().getTime());
  }else if(Meteor.isClient){
    console.log("publications.js - books - client " + new Date().getTime());
  }
  return Books.find({catName : option});
});
/** like의 해당 book인 값만 publish **/
Meteor.publish('viewlikes', function(option) {
  if(Meteor.isServer){
    console.log("publications.js - likes - server " + new Date().getTime());
  }else if(Meteor.isClient){
    console.log("publications.js - likes - client " + new Date().getTime());
  }
  return Likes.find({book : option});
});
/** like의 해당 카테고리인 값만 publish **/
Meteor.publish('likes', function(option) {
  if(Meteor.isServer){
    console.log("publications.js - likes - server " + new Date().getTime());
  }else if(Meteor.isClient){
    console.log("publications.js - likes - client " + new Date().getTime());
  }
  return Likes.find({category : option});
});
