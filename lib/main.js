const DOMNodeCollection = require('./dom_node_collection');

window.$l  = function (arg) {
  if (arg instanceof(HTMLElement) || typeof(arg) === 'function') {
    var arr = [arg];
    return new DOMNodeCollection(arr);
  } else {
    var elementList = document.querySelectorAll(arg);
    arr = Array.from(elementList);
  }

  return new DOMNodeCollection(arr);
};

$l.extend = function (base, ...otherObjects) {
  Object.keys(base).forEach( (key) => {
    for (var i = 0; i < otherObjects.length; i++) {
      if (otherObjects[i][key] !== undefined) {
        base[key] = otherObjects[i][key];
      }
    }
  });
  return base;
};

$l.ajax = function (option) {
  console.log('beginning');
  const xhr = new XMLHttpRequest();
  const default1 = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    url: '',
    dataType: '',
    data: null,
    method: 'GET',
    success: () => {},
    error: () => {},

  };

  if (typeof(option) === 'object') {

    option = this.extend(default1, option);

    xhr.open(option.method, option.url, true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        option.success(xhr.response);
      } else {
        option.error(xhr.response);
      }
    };
      xhr.send(JSON.stringify(option.data));
    } else {

    return;
  }
};
