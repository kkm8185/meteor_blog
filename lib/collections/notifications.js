Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  /** doc : 기존의 notification **/
  /** fieldNames : $set의 인자들 **/
  /** ex) Notifications.update(this._id, {$set: {read: true}}); -> [0] : 'read' **/
  /** 알람받는 userId와 현 user가 같으면서, 필드가 read부분을 수정하는 것이라면 true **/
  update: function(userId, doc, fieldNames) {
    console.log("notification allow -------------------------------------------");
    return doc.userId === userId && 
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});
/** 알림 생성 **/
createlikeNotification = function(like) {
  var book = Books.findOne(like.book);
  /** 글쓴사람과 like한 사람이 다르다면 DB에 알림 추가 **/
  if (like.muser !== book.user_id) {
    Notifications.insert({
      likername : like.username,
      userId: book.user_id,
      bookId: book._id,
      likeId: like._id,
      likerName: like.muser,
      category : like.category,
      read: false
    });
  }
};
