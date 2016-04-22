Categories = new Mongo.Collection('categories');
/** 카테고리에 관련된 자료가 없다면, 일단 자료 삽입 **/
Meteor.startup(function() {
  if(Meteor.isServer){
    if(Categories.find().count() === 0) {
      // Categories
      console.log(Meteor.isServer);
      console.log(Meteor.isClient);
      console.log("Categories insert ok");
      Categories.insert({name:'Tech'});
      Categories.insert({name:'Design'});
      Categories.insert({name:'Business'});
      Categories.insert({name:'Science'});
      Categories.insert({name:'Scifi'});
      Categories.insert({name:'Psychology'});
      console.log("Categories insert end");
    }
  }
});
