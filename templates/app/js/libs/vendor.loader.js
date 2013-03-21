/**
 * @fileoverview third-party deps loader. Works only for devel env.
 */
goog.provide('ssd.vendor');


if (!COMPILED) {

  /**
   * EDIT THIS ARRAY.
   *
   * @type {Array} define the 3rd party deps.
   */
  ssd.vendor.files = [
    'when.js',
    '../../components/jquery/jquery.js'
  ];



  //
  //
  //
  // Nothing to see here, move on...
  //
  //

  /**
   * load third party dependencies.
   *
   * @param  {Array} deps key value, value being the url.
   */
  ssd.vendor.loadDeps = function(deps) {
    for(var i = 0, len = deps.length; i < len; i++) {
      ssd.vendor.writeScript(deps[i]);
    }
  };

  /**
   * Write script on document. This operation will get scripts synchronously.
   *
   * @param  {string} src A canonical path.
   * @param  {boolean=} optInline set to true to append inline javascript.
   */
  ssd.vendor.writeScript = function (src, optInline) {

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
   * @param {Array} files
   */
  ssd.vendor.go = function(files) {

    var vendorFilepath = goog.basePath + goog.getPathFromDeps_('ssd.vendor');

    var vendorFilename = vendorFilepath.match(/[\.\w]+$/)[0];

    var ind = vendorFilepath.indexOf(vendorFilename);

    var vendorPath = vendorFilepath.substr(0, ind);

    var newFiles = [];

    for (var i = 0, len = files.length; i < len; i++) {
      newFiles.push(vendorPath + '../vendor/' + files[i]);
    }

    // load third party deps
    ssd.vendor.loadDeps(newFiles);
  };

  ssd.vendor.go(ssd.vendor.files);
}
