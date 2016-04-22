Books = new Mongo.Collection('books');
/** 책에 관련된 자료가 없다면, 일단 자료 삽입 **/
Meteor.startup(function() {
  if(Meteor.isServer){
    if(Books.find().count() === 0) {
     Books.insert({title:'Beign Mortal', url:'http://ecx.images-amazon.com/images/I/91E6exaOufL.jpg', format: 'Ebook',catName:'Psychology', body : 'good'});
     Books.insert({title:'Eloquent JavaScript', url:'https://yuq.me/users/41/792/YO81mXVMpK.png', format: 'AudioBook',catName:'Tech', body : 'hihi'});
     Books.insert({title:'Principles Of Web Design', url:'https://yuq.me/users/27/445/MXtELWFw17.jpg', format: 'Ebook',catName:'Design', body : 'tellme'});
     Books.insert({title:'Beign Mortal', url:'http://ecx.images-amazon.com/images/I/91E6exaOufL.jpg', format: 'Ebook',catName:'Psychology', body : 'mad'});
     Books.insert({title:'Eloquent JavaScript', url:'https://yuq.me/users/41/792/YO81mXVMpK.png', format: 'AudioBook',catName:'Tech', body : 'regret'});
     Books.insert({title:'Principles Of Web Design', url:'https://yuq.me/users/27/445/MXtELWFw17.jpg', format: 'Ebook',catName:'Design', body : 'c b c'});
    } 
  }
});
Meteor.methods({
  /** Meteor.call을 통해 아래 함수를 호출 가능 **/
  bookInsert: function(bookAttributes) {
    if(Meteor.isServer){
      console.log("books - method - bookInsert - server "+new Date().getTime());
    }else if(Meteor.isClient){
      console.log("books - method - bookInsert - client "+new Date().getTime());
    }
    try{
      check(this.userId, String);
    }catch(e){
      throw new Meteor.Error("not_same_id", "not_same_id","aa");
    }
    /** bookAttribute에 대한 값을 check **/
    check(bookAttributes, {
      public_id : String,
      url : String,
      title: String,
      format : String,
      catName : String,
      body : String
    });
    var user = Meteor.user();
    /** bookAttributes에 user_id 추가 **/
    var book = _.extend(bookAttributes, {
      user_id : this.userId,
    });
    /** DB에 Book 추가 **/
    var booksId = Books.insert(book);
    console.log("books - method - bookInsert - server - return"+new Date().getTime());
    return booksId;
  },
  BookRemove: function(bookAttributes){
    if(Meteor.isServer){
      console.log("books - method - BookRemove - server "+new Date().getTime());
    }else if(Meteor.isClient){
      console.log("books - method - BookRemove - client "+new Date().getTime());
    }
    try{
      check(this.userId, String);
    }catch(e){
      throw new Meteor.Error("not_same_id", "not_same_id","aa");
    }
    /** 해당 책에 관련된 알림 찾기 **/
    var empty = Notifications.find({bookId : bookAttributes._id}).fetch();
    /** 알림들 삭제 **/
    for ( var temp in empty){
      console.log(temp);
      console.log(empty[temp]);
      Notifications.remove(empty[temp]);
    }
    /** 해당 책에 관련된 좋아요 찾기 **/
    empty = Likes.find( { book : bookAttributes._id }).fetch();
    /** 좋아요 삭제 **/
    for ( var temp in empty ){
      Likes.remove(empty[temp]);
    }
    /** bookAttribute에 대한 값을 check **/
    try{
      check(bookAttributes, {
        public_id : String,
        _id : String,
        catName : String,
        format : String,
        title: String,
        url : String,
        user_id : String,
        body : String
      });
    }catch(e){
      throw new Meteor.Error("check error", "check error","check error");
    }
    /** 해당 책 삭제 **/
    try{
      var booksId = Books.remove(bookAttributes);
    }catch(e){
      throw new Meteor.Error("remove error", "remove error","remove error");
    }
    return booksId;
  }
});
