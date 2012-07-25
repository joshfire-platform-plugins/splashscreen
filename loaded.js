define([], function () {
  return function (params) {
    return {
      generate: function (options, callback) {
        try {
          var elt = document.getElementsByClassName('_joshfire_factory_splashscreen');
          if (elt && elt.length) {
            //TODO detect that the browser won't support opacity
            elt[0].style.opacity = '0';
            setTimeout(function() {
              elt[0].style.display = 'none';
            },700);
          }

        } catch (e) {}
        callback();
      }
    };
  };
});