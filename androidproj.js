/*global console*/
define([], function () {
  return function (runtime, params, callback) {
    console.log('add-on', 'splashscreen', 'androidproj started');

    var base;
    var devices = params.params['deployconf']['params']['devices'];
    console.log('add-on', 'splashscreen', 'devices', devices);

    /**
     * Returns true if deploy configuration targets at least one
     * device that belongs to the given device family
     */
    var hasDeviceFamily = function (deviceFamily) {
      var i = 0;
      for (i = 0; i < devices.length; i++) {
        if ((devices[i] === '*') ||
          (devices[i].indexOf(deviceFamily + '-') === 0)) {
          console.log('add-on', 'splashscreen', 'hasDeviceFamily',
            deviceFamily, 'true');
          return true;
        }
      }
      console.log('add-on', 'splashscreen', 'hasDeviceFamily',
        deviceFamily, 'false');
      return false;
    };

    runtime.async.series([
      function (cb) {
        console.log('add-on', 'splashscreen', 'android-portrait', 'start');
        if (!hasDeviceFamily('phone')) return cb();
        if (!params.options["android-portrait"]) return cb();

        base = "res/_base."+params.options["android-portrait"].ext;
        console.log('add-on', 'splashscreen', 'android-portrait', base);

        runtime.copy(params.options["android-portrait"].url, base, function (err) {
          if (err) return cb(err);
          runtime.imagemagick('convert',
            base + ' -resize 720x960^' +
            ' -gravity center -extent 720x960' +
            ' res/drawable/splash.png',
            function (err) {
              if (err) return cb(err);
              runtime.deleteFile(base, cb);
            }
          );
        });
      },

      function (cb) {
        console.log('add-on', 'splashscreen', 'android-landscape', 'start');
        if (!hasDeviceFamily('tablet')) return cb();
        if (!params.options['android-landscape']) return cb();

        base = 'res/_base.' + params.options['android-landscape'].ext;
        console.log('add-on', 'splashscreen', 'android-landscape', base);

        runtime.copy(params.options['android-landscape'].url, base, function (err) {
          if (err) return cb(err);
          runtime.imagemagick('convert',
            base + ' -resize 960x720^' +
            ' -gravity center -extent 960x720' +
            ' res/drawable-land/splash.png',
            function (err) {
              if (err) return cb(err);
              runtime.deleteFile(base, cb);
            }
          );
        });
      }
    ], function (err) {
      if (err) {
        console.error('add-on', 'splashscreen', 'androidproj error', err);
      }
      else {
        console.log('add-on', 'splashscreen', 'androidproj done');
      }
      return callback(err);
    });

  };
});