/** minimongo 에서만 사용하기 위한 error콜렉션 **/
Errors = new Mongo.Collection(null);
throwError = function(message) {
  Errors.insert({message: message});
};
