/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require("path");

module.exports = function (context) {
  console.log(context);
  const isProd = process.env.NODE_ENV === "production";
  return {
    name: "lstenai-analytics",
    getClientModules() {
      console.log("isProd-->", isProd);
      return !isProd ? [path.resolve(__dirname, "./analytics")] : [];
    },
  };
};
