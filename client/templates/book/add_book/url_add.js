
Template.url_add.created = function() {
  console.log("url_add - created" + new Date().getTime());
}

Template.url_add.helpers({
  catname : function(){
    console.log("url_add - helpers - catname " + new Date().getTime());
    return  Session.get('category');
  }
});
Template.url_add.events({
  'submit form': function(e) {
    e.preventDefault();
    console.log("url_add - submit event" + new Date().getTime());
    /** 책에 관련된 데이터 저장 public_id가 존재하지 않다는 의미로, no값 지정**/
    var book_data = {
      public_id : "no",
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      format : $(e.target).find('[name=format]').val(),
      catName : $(e.target).find('[name=catName]').val(),
      body : $(e.target).find('[name=body]').val()
    };
    console.log(book_data);
    /** DB에 저장하는 bookInsert 함수 호출 후, callback함수 **/
    Meteor.call('bookInsert', book_data, function(error, result) {
      console.log('bookInsert - callback');
      console.log(result);
      console.log(error);
      Router.go('books', {name: Session.get('category')});  
    });
    Router.go('books', {name: Session.get('category')});  
  }
});
