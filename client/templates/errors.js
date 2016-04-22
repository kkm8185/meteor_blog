Template.errors.helpers({
  /** 클라이언트내에서만 사용하는 것으로서, minimongo에서 error데이터를 찾는다 **/
  errors: function() {
    return Errors.find();
  }
});
Template.error.rendered = function() {
  /** rendered콜백은 브라우저에서 렌더될때 단 한번만 호출된다. **/
  /** this.data를 통해 렌더링된 객체의 데이터 접근 가능 **/
  var error = this.data;
  Meteor.setTimeout(function () {
  /** 2초뒤에 error 삭제 **/
    Errors.remove(error._id);
  }, 2000);
};
