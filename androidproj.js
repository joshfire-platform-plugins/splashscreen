define([], function () {
  return function(runtime, params, callback) {

    var base;

    /**
     * Returns true if deploy configuration targets at least one
     * device that belongs to the given device family
     */
    var hasDeviceFamily = function (deviceFamily) {
      var device = null;
      var devices = params.params['deployconf']['params']['devices'];
      for (device in devices) {
        if ((device === '*') ||
          (device.indexOf(deviceFamily + '-') === 0)) {
          return true;
        }
      }
      return false;
    };
    
    runtime.async.series([
      function(cb) {
        if (!hasDeviceFamily('phone')) return cb();
        if (!params.options["android-portrait"]) return cb();

        base = "res/_base."+params.options["android-portrait"].ext;
        runtime.copy(params.options["android-portrait"].url, base, function (err) {
          runtime.imagemagick('convert',
            base + ' -resize 720x960! res/drawable/splash.png',
            function (err) {
              runtime.deleteFile(base,cb);
            }
          );
        });
      },
      function(cb) {
        if (!hasDeviceFamily('tablet')) return cb();
        if (!params.options['android-landscape']) return cb();

        base = 'res/_base.' + params.options['android-landscape'].ext;
        runtime.copy(params.options['android-landscape'].url, base, function (err) {
          runtime.imagemagick('convert',
            base + ' -resize 960x720! res/drawable-land/splash.png',
            function (err) {
              runtime.deleteFile(base,cb);
            }
          );
        });
      }
    ],callback);

  };
});