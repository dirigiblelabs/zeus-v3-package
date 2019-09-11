var errors = require("kubernetes/errors");
let err = new errors.NotFoundError({
  "kind": "Status",
  "apiVersion": "v1",
  "metadata": {},
  "status": "",
  "message": "services.serving.knative.dev \"testNew\" not found",
  "reason": "NotFound",
  "details": {
    "name": "testNew",
    "group": "serving.knative.dev",
    "kind": "services"
  },
  "code": 404
});

if(!(err instanceof errors.NotFoundError)){
    throw new Error('expected: true, actual: false');
}
if(!(err instanceof errors.K8sApiError)){
    throw new Error('expected: true, actual: false');
}
if(!(err instanceof Error)){
    throw new Error('expected: true, actual: false');
}
if(!(typeof err === 'object')){
    throw new Error('expected: true, actual: false');
}
if(err.message !== "services.serving.knative.dev \"testNew\" not found"){
    throw new Error('expected: "services.serving.knative.dev \"testNew\" not found", actual: ' + err.message);
}
if(err.reason !== "NotFound"){
    throw new Error('expected: NotFound", actual: ' + err.reason);
}
if(err.code !== 404){
    throw new Error('expected: 404", actual: ' + err.code);
}
let errdetailsstr = JSON.stringify( {
    "name": "testNew",
    "group": "serving.knative.dev",
    "kind": "services"
  });
if(err.details && JSON.stringify(err.details) !== errdetailsstr){
    throw new Error('expected: "'+errdetailsstr+'", actual: ' + JSON.stringify(err.details));
}


console.info("Tests passed ok")