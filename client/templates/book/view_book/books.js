Template.books.helpers({
  catnotselected:function() {
    console.log("books.js - books - helpers - catnotselected - function");
    return Session.equals('category',null);
  },
  category:function() {
    console.log("books.js - books - helpers - category - function");
    return  Session.get('category');
  },
  booklist:function(){
    /** 첫 시작이라면 값은 없으므로, 그냥 리턴, 첫 시작이 아니라면 this값을 return **/
    console.log("books.js - books - helpers - booklist - function");
    if(Object.keys(this).length===0)  return ;
    else                              return this;

  }
});
