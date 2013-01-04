/*global console*/
define([], function () {
  return function (runtime, params, callback) {
    console.log('add-on', 'splashscreen', 'subdeploypackage started');

    var base;
    var devices = params.params['deployconf']['params']['devices'];
    console.log('add-on', 'splashscreen', 'devices', devices);

    /**
     * Returns true if deploy configuration targets at least one
     * device that belongs to the given device family
     */
    var hasDeviceFamily = function (deviceFamily) {
      var device = null;
      for (device in devices) {
        if ((device === '*') ||
          (device.indexOf(deviceFamily + '-') === 0)) {
          return true;
        }
      }
      return false;
    };

    var basedir = params.documentroot + '/joshfirefactory_splashscreens/';

    runtime.async.series([
      function (cb) {
        if (!hasDeviceFamily('phone')) return cb();
        if (!params.options['ios-phone-portrait']) return cb();

        base = basedir + '_base.' + params.options['ios-phone-portrait'].ext;
        console.log('add-on', 'splashscreen', 'iphone-portrait', base);

        runtime.copy(params.options['ios-phone-portrait'].url, base,
          function (err) {
            if (err) return cb(err);

            runtime.imagemagick('convert',
              base + ' -resize 640x960^' +
              ' -gravity center -extent 640x960' +
              ' ' + basedir + 'splash-ios-640-960.png',
              function (err) {
                if (err) return cb(err);
                runtime.imagemagick('convert',
                  base + ' -resize 320x480^' +
                  ' -gravity center -extent 320x480' +
                  basedir + 'splash-ios-320-480.png',
                  function (err) {
                    if (err) return cb(err);
                    runtime.deleteFile(base, cb);
                  }
                );
              }
            );
          }
        );
      },

      function (cb) {
        if (!hasDeviceFamily("phone")) return cb();
        if (!params.options["ios-phone-4inch-portrait"]) return cb();

        base = basedir + '_base.' +
          params.options['ios-phone-4inch-portrait'].ext;
        console.log('add-on', 'splashscreen', 'iphone-4inch-portrait', base);

        runtime.copy(params.options['ios-phone-4inch-portrait'].url, base,
          function (err) {
            if (err) return cb(err);

            runtime.imagemagick('convert',
              base + ' -resize 640x1136^' +
              ' -gravity center -extent 640x1136' +
              ' ' + basedir + 'splash-ios-640-1136.png',
              function (err) {
                if (err) return cb(err);
                runtime.deleteFile(base, cb);
              }
            );
          }
        );
      },

      function (cb) {
        if (!hasDeviceFamily('tablet')) return cb();
        if (!params.options['ios-ipad-portrait']) return cb();

        base = basedir + '_base.' + params.options['ios-ipad-portrait'].ext;
        console.log('add-on', 'splashscreen', 'ipad-portrait', base);

        runtime.copy(params.options['ios-ipad-portrait'].url, base,
          function (err) {
            if (err) return cb(err);

            runtime.imagemagick('convert',
              base + ' -resize 1536x2048^' +
              ' -gravity center -extent 1536x2048' +
              ' ' + basedir + 'splash-ios-1536-2048.png',
              function (err) {
                if (err) return cb(err);
                runtime.imagemagick('convert',
                  base + ' -resize 768x1024^' +
                  ' -gravity center -extent 768x1024' +
                  basedir + 'splash-ios-768-1024.png',
                  function (err) {
                    if (err) return cb(err);
                    runtime.deleteFile(base,cb);
                  }
                );
              }
            );
          }
        );
      },

      function (cb) {
        if (!hasDeviceFamily('tablet')) return cb();
        if (!params.options['ios-ipad-landscape']) return cb();

        base = basedir + '_base.' + params.options['ios-ipad-landscape'].ext;
        console.log('add-on', 'splashscreen', 'ipad-landscape', base);

        runtime.copy(params.options['ios-ipad-landscape'].url, base,
          function (err) {
            if (err) return cb(err);
            runtime.imagemagick('convert',
              base + ' -resize 2048x1536^' +
              ' -gravity center -extent 2048x1536' +
              basedir + 'splash-ios-2048-1536.png',
              function (err) {
                if (err) return cb(err);
                runtime.imagemagick('convert',
                  base + ' -resize 1024x768^' +
                  ' -gravity center -extent 1024x768' +
                  basedir + 'splash-ios-1024-768.png',
                  function (err) {
                    if (err) return cb(err);
                    runtime.deleteFile(base,cb);
                  }
                );
              }
            );
          }
        );
      }
    ], function (err) {
      if (err) {
        console.error('add-on', 'splashscreen', 'subdeploypackage error', err);
      }
      else {
        console.log('add-on', 'splashscreen', 'subdeploypackage done');
      }
      return callback(err);
    });
  };
});