import Parse from 'parse';

export default function request(app, method, path, body, options) {
  let xhr = new XMLHttpRequest();
  let promise = new Parse.Promise();
  if (path[0] === '/') {
    path = path.substr(1);
  }
  let url = location.protocol + '//' + location.host + '/1/' + path;
  xhr.open(method, url, true);
  xhr.setRequestHeader('X-Parse-Application-Id', app.applicationId);
  if (options.useMasterKey) {
    xhr.setRequestHeader('X-Parse-Master-Key', app.masterKey);
  } else {
    xhr.setRequestHeader('X-Parse-REST-API-Key', app.restKey);
  }
  if (options.sessionToken) {
    xhr.setRequestHeader('X-Parse-Session-Token', options.sessionToken);
  }
  xhr.onload = function(e) {
    let response = xhr.responseText;
    try {
      response = JSON.parse(response);
    } catch (e) {}
    promise.resolve(response);
  }
  xhr.send(body);
  return promise;
}
