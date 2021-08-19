/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require("path");

module.exports = function (context) {
  return {
    name: "lstenai-kf",
    injectHtmlTags() {
      return {
        postBodyTags: [`<script>
          (function (w, d, n, a, j) {
            w[n] = w[n] || function () {
              (w[n].a = w[n].a || []).push(arguments);
            };
            j = d.createElement('script');
            j.async = true;
            j.src ='https://qiyukf.com/script/d1c5d64b7d61c97003f611c502100008.js';
            d.body.appendChild(j);
          })(window, document, 'ysf');
          (function (w, d, n, a, j) {
            w[n] = w[n] || function () {
              (w[n].a = w[n].a || []).push(arguments);
            };
            j = d.createElement('script');
            j.async = true;
            j.src ='https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js';
            d.body.appendChild(j);
          })(window, document, 'simplemde');
        </script>`
      ],
      }
    }
  };
};
