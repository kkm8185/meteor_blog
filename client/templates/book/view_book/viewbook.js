var flag = false;
Template.viewbook.helpers({
  url : function(){
    console.log('viewbook.js - viewbook - helpers - url - function' + new Date().getTime());
    console.log(this);
    if(Object.keys(this).length !== 0 && Books.find().count() === 0){
      /** 글쓴이가 자기가 아니고, 보는 도중에 삭제되었다면, error 발생 **/
      if(this.user_id !== Meteor.userId()){
        throwError("writer is delete the posting data");
      }
      return Router.go('books', {name: Session.get('category')});  
    }
    else if(Object.keys(this).length === 0){
      console.log('key is zero');
      return '';
    }
    if(this.url === undefined){
      return Router.go('books', {name: Session.get('category')});  
    }
    else{
      return this.url;
    }
    return '';
  },
  like_check : function(){
    /** like를 한 사람이 자기 자신이라면, 라이크 버튼이 아닌 취소 버튼 보여주도록 한다 **/
    console.log('viewbook.js - viewbook - helpers - like_check - function' + new Date().getTime());
    console.log(Likes.findOne({muser:Meteor.userId(),book:this._id}));
    return Likes.findOne({muser:Meteor.userId(),book:this._id}) ? false : true;
  },
  remove_check: function(){
    /** 글쓴 당사자가 자기 자신이라면, 삭제버튼 보여주도록 한다 **/
    console.log('viewbook.js - viewbook - helpers - remove_check - function' + new Date().getTime());
    return this.user_id===Meteor.userId()? true: false;
  },
  button_check : function(){
    /** 글쓴 당사자가 자기 자신이라면, 좋아요, 좋아요 취소 버튼을 보여주지 않도록 한다. **/
    console.log('viewbook.js - viewbook - helpers - button_check - function' + new Date().getTime());
    return this.user_id === Meteor.userId() ? false : true;
  },
  numLikes:function() {
    /** 해당 책 좋아요 수 **/
    console.log('viewbook.js - viewbook - helpers - numLikes - function' + new Date().getTime());
    return Likes.find({book:this._id}).count();
  },
  likesThis:function() {
    /** 좋아요 문구 표시 **/
    console.log('viewbook.js - viewbook - helpers - likesThis - function' + new Date().getTime());
    var doeslike = Likes.findOne({muser:Meteor.userId(),book:this._id});
    if (doeslike) {
      return 'You liked this';
    }
  }
});
Template.viewbook.events({
  /** 좋아요 **/
  'click .like':function(event, template){
    console.log('viewbook.js - viewbook - events - click .like - function' + new Date().getTime());
    /** 좋아요 관련된 정보 **/
    var like_data = {
      muser: Meteor.userId(),
      book : template.data._id,
      category : template.data.catName,
      username : Meteor.user().username
    };
    /** DB에 like에 관련된 정보 저장 후, callback 함수 **/
    Meteor.call('booklike', like_data, function(error, result) {
      console.log('viewbook.js - viewbook - events - click .like - booklike - callback - function' + new Date().getTime());
      console.log(result);
      console.log(error);
    });
  },
    /** 좋아요 취소 **/
  'click .remove':function(event, template){
    console.log('viewbook.js - viewbook - events - click .remove - function' + new Date().getTime());
    /** 좋아요 취소 관련 정보 **/
    var cancel_data = {
      _id : Likes.findOne({muser:Meteor.userId(),book:template.data._id})._id,
      muser: Likes.findOne({muser:Meteor.userId(),book:template.data._id}).muser,
      book : template.data._id,
      category : template.data.catName
    };
    /** DB에 like에 관련된 정보 삭제 후, callback 함수 **/
    Meteor.call('likeremove', cancel_data, function(error, result) {
      console.log('viewbook.js - viewbook - events - click .remove - likeremove - callback - function' + new Date().getTime());
      console.log(result);
      console.log(error);
    });

  },
  /** 책 삭제 **/
  'click .book_remove': function(event, template){
    console.log('viewbook.js - viewbook - events - click .book_remove - function' + new Date().getTime());
    /** 클라우디너리에 저장되어있는 사진 삭제 후, callback 함수**/
    Meteor.call("c.delete_by_public_id",template.data.public_id, function(err,res){
      console.log('viewbook.js - viewbook - events - click .book_remove - c.delete_by_public_id - callback - function' + new Date().getTime());
      console.log("bye");
      console.dir(res);
    });
    /** DB에 Book에 관련된 정보 삭제 후, callback 함수 **/
    Meteor.call('BookRemove', template.data, function(error, result) {
      console.log('viewbook.js - viewbook - events - click .book_remove - urlRemove - callback - function' + new Date().getTime());
      console.log(result);
      console.log(error);
      Router.go('books', {name: Session.get('category')});  
    });
    Router.go('books', {name: Session.get('category')});  
  }
});

