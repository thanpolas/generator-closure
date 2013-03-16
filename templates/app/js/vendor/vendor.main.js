/**
 * @fileoverview third-party deps loader.
 */
goog.provide('app.vendor');


if (!COMPILED) {
  /**
   * load third party dependencies.
   *
   * @param  {[type]} deps [description]
   * @param  {Object} deps key value, value being the url.
   */
  app.loadDeps = function(deps) {
    goog.object.forEach(deps, function(src) {
      app.writeScript(src);
    });
  };

  /**
   * Write script on document. This operation will get scripts synchronously.
   *
   * @param  {string} src A canonical path.
   * @param  {boolean=} optInline set to true to append inline javascript.
   */
  app.writeScript = function (src, optInline) {

    var out = '<script type="text/javascript"';
    if (!optInline) {
      out += ' src="' + src + '">';
    } else {
      out += '>' + src;
    }
    out += '</script>';
    document.write(out);
  };


  /**
   * Load vendor deps
   * @return {[type]} [description]
   */
  app.vendor = function() {

    var vendorFilepath = goog.basePath + goog.getPathFromDeps_('app.vendor');

    var vendorFilename = vendorFilepath.match(/[\.\w]+$/)[0];

    var ind = vendorFilepath.indexOf(vendorFilename);

    var vendorPath = vendorFilepath.substr(0, ind);

    // load third party deps
    app.loadDeps({
      //goog.basePath goog.getPathFromDeps_('app')
      when: vendorPath + 'when.js'
    });
  };

  app.vendor();
}
