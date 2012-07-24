define([], function () {
  return function(runtime, params, callback) {

    var base;
    
    runtime.async.series([
      function(cb) {
        if (params.params["deployconf"]["params"]["devices"].indexOf("phone")==-1) return cb(); //TODO sub-device support
        if (!params.options["ios-phone-portrait"]) return cb();

        base = "Resources/Splash/_base."+params.options["ios-phone-portrait"].ext;
        runtime.copy(params.options["ios-phone-portrait"].url,base,function(err) {

          runtime.imagemagick("convert",base+" -resize 640x960! Resources/splash/Default@2x.png",function(err) {
            runtime.imagemagick("convert",base+" -resize 320x480! Resources/splash/Default.png",function(err) {
              runtime.deleteFile(base,cb);
            });
          });
          
          
        });
      },
      function(cb) {
        if (params.params["deployconf"]["params"]["devices"].indexOf("tablet")==-1) return cb(); //TODO sub-device support
        if (!params.options["ios-ipad-portrait"]) return cb();

        base = "Resources/Splash/_base."+params.options["ios-ipad-portrait"].ext;
        runtime.copy(params.options["ios-ipad-portrait"].url,base,function(err) {

          runtime.imagemagick("convert",base+" -resize 1536x2048! Resources/splash/Default-Portrait@2x~ipad.png",function(err) {
            runtime.imagemagick("convert",base+" -resize 768x1024! Resources/splash/Default-Portrait~ipad.png",function(err) {
              runtime.deleteFile(base,cb);
            });
          });
          
          
        });
      },
      function(cb) {
        if (params.params["deployconf"]["params"]["devices"].indexOf("tablet")==-1) return cb(); //TODO sub-device support
        if (!params.options["ios-ipad-landscape"]) return cb();

        base = "Resources/Splash/_base."+params.options["ios-ipad-landscape"].ext;
        runtime.copy(params.options["ios-ipad-landscape"].url,base,function(err) {

          runtime.imagemagick("convert",base+" -resize 2048x1536! Resources/splash/Default-Landscape@2x~ipad.png",function(err) {
            runtime.imagemagick("convert",base+" -resize 1024x768! Resources/splash/Default-Landscape~ipad.png",function(err) {
              runtime.deleteFile(base,cb);
            });
          });
          
          
        });
      }
    ],callback);

  };
});