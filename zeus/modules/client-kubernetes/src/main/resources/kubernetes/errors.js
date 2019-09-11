if (!exports){
  exports = {};
}

let K8sApiError = function(response) {
  var error = Error.call(this, response.message);
  this.message = error.message;
  this.stack = error.stack;
  this.details = response.details;
  this.reason = response.reason;
  this.code = response.code;
};
K8sApiError.prototype = Object.create(Error.prototype);
K8sApiError.prototype.constructor = K8sApiError;
exports.K8sApiError = K8sApiError;

let AlreadyExistsError = function(response) {
  K8sApiError.call(this, response);
  this.name = "AlreadyExistsError";
};
AlreadyExistsError.prototype = Object.create(K8sApiError.prototype);
AlreadyExistsError.prototype.constructor = AlreadyExistsError;
exports.AlreadyExistsError = AlreadyExistsError;

let NotFoundError = function(response) {
  K8sApiError.call(this, response);
  this.name = "NotFoundError";
};
NotFoundError.prototype = Object.create(K8sApiError.prototype);
NotFoundError.prototype.constructor = NotFoundError;
exports.NotFoundError = NotFoundError;

let FieldValueInvalidError = function(message, details) {
  K8sApiError.call(this, message);
  this.name = "NotFoundError";
};
FieldValueInvalidError.prototype = Object.create(Error.prototype);
FieldValueInvalidError.prototype.constructor = FieldValueInvalidError;
exports.FieldValueInvalidError = FieldValueInvalidError;

let BadRequestError = function(response) {
  K8sApiError.call(this, response);
  this.name = "BadRequestError";
};
BadRequestError.prototype = Object.create(K8sApiError.prototype);
BadRequestError.prototype.constructor = BadRequestError;
exports.BadRequestError = BadRequestError;

exports.fromResponse = function(response){
  if (response.reason === 'AlreadyExists'){
    return new AlreadyExistsError(response);
  }
  if (response.reason === 'NotFound'){
    return new NotFoundError(response);
  }
  if (response.reason === 'Invalid'){
    return new FieldValueInvalidError(response);
  }
  if (response.reason === 'BadRequest'){
    return new FieldValueInvalidError(response);
  }
};