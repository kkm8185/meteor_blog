/** 모든 라우터의 기본 환경 설정 
    기본 템플릿은 layout
    {{>books}}의 경우, 탬플릿 명이 books인 것을 찾는다
    기본적으로 useroption, categories, notification을 subscribe한다 **/
Router.configure({
  layoutTemplate:'layout',
  yieldTemplates:{
  'books':{to:'books'},
  'categories':{to:'categories'}
  },
  waitOn : function(){
    console.log("router - configure - waitOn"+new Date().getTime());
    return [Meteor.subscribe('useroption',Meteor.userId()),Meteor.subscribe('categories'),Meteor.subscribe('notifications')];
  },
  data : function(){  }
});
Router.map(function(){
    /** pathFor를 home으로 설정한다면 path는 /로 설정 **/
    this.route('home',{
      path : '/',
    });
    /** 책 추가할 때 사용된다 **/
    /** pathFor를 addbook으로 설정한다면 path경로는 아래와 같다**/
    /** 기본템플릿은 add_optionlayout으로 설정 **/
    /** 기본템플릿의 yield는 addbook템플릿으로 설정 **/
    /** to는 yield에 사용되는 이름, 'url_add'는 해당 템플릿 명 **/
    /** name의 경우, 카테고리 값이다. **/
    this.route('addbook',{
      name : 'addbook',
      layoutTemplate:'add_optionlayout',
      path : '/book/:name/add',
      yieldTemplates:{
      'url_add':{to:'urladd'},
      'image_add':{to:'imageadd'}
      // this.render('books', {to : 'books'}) == 'books':{to:'books'}
      },
      waitOn : function(){
        console.log("this param.name : ", this.params.name);
        Meteor.subscribe('books', this.params.name)
      },
      data : function(){
        console.log("router - map - /:name/add - data");
        console.log("this params _id : "+this.params.name);
      }
    });
    /** 책들을 클릭하여 큰 화면으로 내용과 함께 볼때 사용된다 **/
    /** pathFor를 viewbook으로 설정한다면, path는 아래와 같다 **/
    /** 기본탬플릿은 viewbooklayout으로 설정 **/
    /** yield를 설정 **/
    /** name의 경우 카테고리 값이다 **/
    /** id의 경우, book의 _id이다 **/
    this.route('viewbook', {
        name : 'viewbook',
        layoutTemplate:'viewbooklayout',
        path:'/book/:name/:_id',
        yieldTemplates:{
        'categories':{to:'categories'},
        'viewbook':{to:'viewbook'}
        // this.render('books', {to : 'books'}) == 'books':{to:'books'}
        },
        waitOn: function(){
          console.log(this.params.name);
          console.log(this.params._id);
          console.log("router - maps - viewbook - waitOn");
          return [
            Meteor.subscribe('viewbooks', this.params._id),
            Meteor.subscribe('viewlikes', this.params._id),
            ];
          },
        data: function() {
          if(Books.find().count() === 0){
            console.log("ing - true set");
            Session.set('ing',true);
          }else{
            console.log("ing - false set");
            Session.set('ing',false);
            }
          return Books.findOne(this.params._id); 

          }
    });
    /** 카테고리 선택 시, 작게 책을 볼 때 사용된다 **/
    /** pathFor를 books로 설정한다면, path는 아래와 같다 **/
    /** 기본탬플릿은 layout으로 설정 **/
    this.route('books', {
        name : 'books',
        layoutTemplate:'layout',
        path:'/book/:name',
        waitOn: function(){
          Session.set('category',this.params.name);
          return [
            Meteor.subscribe('books', this.params.name),
            Meteor.subscribe('likes', this.params.name),

            ];
          },
        data: function() {
          return Books.find();
          }
    });
    /** 알림 받을 옵션 선택할 때 사용 **/
    /** pathFor를 option으로 설정한다면, path는 아래와 같다 **
    /** 기본탬플릿은 dd_optionlayout으로 설정 **/
    this.route('option',{
      name : 'option',
      layoutTemplate:'add_optionlayout',
      path : '/option',
      waitOn : function(){      },
      data : function(){
        if(Meteor.isServer){
          console.log("router - posts/:_id/edit - data - server " +new Date().getTime());
        }else if(Meteor.isClient){
          console.log("router - posts/:_id/edit - data - client " +new Date().getTime());
        } 
      }
    });
});

