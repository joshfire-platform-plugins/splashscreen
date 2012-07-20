define([], function () {
  return function(runtime, params, callback) {
  
    if (!params.deploy.isCordova) {

      if (params.options["web-mode"]=="text") {

        var splash = "<div class='_joshfire_factory_splashscreen' style='background-color:#000;height:100%;width:100%;position:absolute;z-index:100000;color:white;text-align:center;top:50%;font-family:Arial,Helvetica,sans-serif;'>Loading...</div>";

        var script = "<script>Joshfire.factory.onDeviceReady(function() {"+
          "document.getElementsByClassName('_joshfire_factory_splashscreen')[0].style.display = 'none';"+
          "});</script>";

        params.content = runtime.bodyPrepend(params.content, splash + script );
      }

    }

    callback(null, params.content);
  };
});