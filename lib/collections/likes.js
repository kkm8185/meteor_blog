Likes = new Mongo.Collection('likes');

Meteor.methods({
  booklike: function(likeAttributes) {
    if(Meteor.isServer){
      console.log("likes.js - Likes - method - booklike - server "+new Date().getTime());
    }else if(Meteor.isClient){
      console.log("likes.js - Likes - method - booklike - client "+new Date().getTime());
    }

    try{
      check(this.userId, String);
    }catch(e){
      throw new Meteor.Error("not_same_id", "not_same_id","aa");
    }

    console.log("after check");
    /** likeAttributes에 대한 값을 check **/
    check(likeAttributes, {
      muser : String,
      book: String,
      category : String,
      username : String
    });
    /** DB에 Like 추가 **/
    var likesId = Likes.insert(likeAttributes);
    likeAttributes._id = likesId;
    /** 알림 추가 **/
    createlikeNotification(likeAttributes);

    return likesId;
  },
  likeremove: function(likeAttributes) {
    if(Meteor.isServer){
      console.log("likes.js - Likes - method - likeremove - server "+new Date().getTime());
    }else if(Meteor.isClient){
      console.log("likes.js - Likes - method - likeremove - client "+new Date().getTime());
    }
    try{
      check(this.userId, String);
    }catch(e){
      throw new Meteor.Error("not_same_id", "not_same_id","aa");
    }
    /** likeAttributes에 대한 값을 check **/
    check(likeAttributes, {
      _id : String,
      muser : String,
      book: String,
      category : String
    });
    /** like한 사람과 내 아이디가 동일하다면 like 삭제 **/
    if(likeAttributes.muser === this.userId){
      console.log("final check");
      var likesId = Likes.remove(likeAttributes);
    }
    return likesId;
  }
});

