define([], function () {
  return function(runtime, params, callback) {

    var base;
    
    runtime.async.series([
      function(cb) {
        if (params.params["deployconf"]["params"]["devices"].indexOf("phone")==-1) return cb(); //TODO sub-device support
        if (!params.options["android-portrait"]) return cb();

        base = "res/_base."+params.options["android-portrait"].ext;
        runtime.copy(params.options["android-portrait"].url,base,function(err) {

          runtime.imagemagick("convert",base+" -resize 720x960! res/drawable/splash.png",function(err) {
            runtime.deleteFile(base,cb);
          });
          
        });
      },
      function(cb) {
        if (params.params["deployconf"]["params"]["devices"].indexOf("tablet")==-1) return cb(); //TODO sub-device support
        if (!params.options["android-landscape"]) return cb();

        base = "res/_base."+params.options["android-landscape"].ext;
        runtime.copy(params.options["android-landscape"].url,base,function(err) {

          runtime.imagemagick("convert",base+" -resize 960x720! res/drawable-land/splash.png",function(err) {
            runtime.deleteFile(base,cb);
          });
          
        });
      }
    ],callback);

  };
});