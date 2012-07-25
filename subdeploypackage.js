define([], function () {
  return function(runtime, params, callback) {

    var base;

    //TODO sub-device support
    var hasDevice = function(device) {
      return (params.params["deployconf"]["params"]["devices"].indexOf(device)>=0 || params.params["deployconf"]["params"]["devices"].indexOf("*")>=0 );
    };

    var basedir = params.documentroot+"/joshfirefactory_splashscreens/";

    runtime.async.series([
      function(cb) {
        if (!hasDevice("phone")) return cb();
        if (!params.options["ios-phone-portrait"]) return cb();

        base = basedir+"_base."+params.options["ios-phone-portrait"].ext;
        runtime.copy(params.options["ios-phone-portrait"].url,base,function(err) {

          runtime.imagemagick("convert",base+" -resize 640x960! "+basedir+"splash-ios-640-960.png",function(err) {
            runtime.imagemagick("convert",base+" -resize 320x480! "+basedir+"splash-ios-320-480.png",function(err) {
              runtime.deleteFile(base,cb);
            });
          });
          
          
        });
      },
      function(cb) {
        if (!hasDevice("tablet")) return cb();
        if (!params.options["ios-ipad-portrait"]) return cb();

        base = basedir+"_base."+params.options["ios-ipad-portrait"].ext;
        runtime.copy(params.options["ios-ipad-portrait"].url,base,function(err) {

          runtime.imagemagick("convert",base+" -resize 1536x2048! "+basedir+"splash-ios-1536-2048.png",function(err) {
            runtime.imagemagick("convert",base+" -resize 768x1024! "+basedir+"splash-ios-768-1024.png",function(err) {
              runtime.deleteFile(base,cb);
            });
          });
          
          
        });
      },
      function(cb) {
        if (!hasDevice("tablet")) return cb();
        if (!params.options["ios-ipad-landscape"]) return cb();

        base = basedir+"_base."+params.options["ios-ipad-landscape"].ext;
        runtime.copy(params.options["ios-ipad-landscape"].url,base,function(err) {

          runtime.imagemagick("convert",base+" -resize 2048x1536! "+basedir+"splash-ios-2048-1536.png",function(err) {
            runtime.imagemagick("convert",base+" -resize 1024x768! "+basedir+"splash-ios-1024-768.png",function(err) {
              runtime.deleteFile(base,cb);
            });
          });
          
          
        });
      }
    ],callback);

  };
});