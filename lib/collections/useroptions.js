Useroption = new Mongo.Collection('useroption');

Useroption.allow({
  insert : function(userId, doc){
    return userId === doc.userId;
  },
  update: function(userId, doc, fieldNames) {
    return doc.userId === userId
  }
});
