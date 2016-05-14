module.exports = (function() {
  "use strict";

  var titleToPath = function(title) {
    var path = title
                    .replace(/[^0-9a-zA-Z ]/g, '')
                    .replace(/ /g, '-')
                    .toLowerCase();
    return path;
  };

  return {
    titleToPath: titleToPath
  };

}());
