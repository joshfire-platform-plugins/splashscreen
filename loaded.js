define([], function () {
  return function (params) {
    return {
      generate: function (options, callback) {
        document.getElementsByClassName('_joshfire_factory_splashscreen')[0].style.display = 'none';
        callback();
      }
    };
  };
});