Template.image_add.onCreated(function () {
  /** 클라우더너리에 올린 사진의 public_id, url 값을 저장하기 위해 만든 변수 **/
    var self = this;
    self.public_id = "";
    self.url = "";
    //Template.instance().selectedUser.get();
});
Template.image_add.created = function() {
  console.log("image_add - created" + new Date().getTime());
  Session.set('img_id',null);
}

Template.image_add.helpers({
  /** 현 카테고리의 값을 catname에 입력 **/
  catname : function(){
    return  Session.get('category');
  }
});
Template.image_add.events({
  /** 파일 선택 했을 경우 **/
  "change input[type='file']" : function(e,t){
    files1 = e.currentTarget.files;
      /** 클라우더너리 업로드 후, callback 함수 ( err은 에러, res는 실행결과 **/
    Cloudinary.upload(files1,{},function(err,res){
      /** 현재 파일 선택이 되어있다면 **/
      if(t.url!="" && t.public_id!=""){
        /** c.delete ~ 함수를 호출하여, 해당 public_id 파일을 클라우더너리에서 삭제한다 **/
        Meteor.call("c.delete_by_public_id",t.public_id, function(err,res){
         console.log("bye");
         console.dir(res);
        });
      }
      console.log("upload error : "+err);
      console.log("upload result : "+res);
      /** 결과에 저장되어있는 url, public_id값을 템플릿의 변수에 임시 저장한다 **/
      t.url = res.url;
      t.public_id = res.public_id;
      return res;
    });
  },
  'submit form': function(e,t) {
    e.preventDefault();
    Session.set('img_id',t.public_id);
    /** 책에 관련된 데이터 저장 **/
    var book_data = {
      public_id : t.public_id,
      url : t.url,
      title: $(e.target).find('[name=title]').val(),
      format : $(e.target).find('[name=format]').val(),
      catName : $(e.target).find('[name=catName]').val(),
      body : $(e.target).find('[name=body]').val()
    };
    console.dir(book_data);
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
