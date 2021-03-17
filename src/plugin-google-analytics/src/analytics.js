/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const axios = require('axios')
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
async function upload(location,origin){
  const {pathname} = location
  console.log('upload',pathname,origin)
  try {
    const response = await axios({
      method: 'post',
      url: `${origin}/event_upload`,
      data: {
        event_type: "lsopen_pageview",
        title: "",
        url:pathname
      }
    });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
}
export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return {
    onRouteUpdate({location}) {
      upload(location,window.location.origin)
      // Set page so that subsequent hits on this page are attributed
      // to this page. This is recommended for Single-page Applications.
      // window.ga('set', 'page', location.pathname);
      // Always refer to the variable on window in-case it gets
      // overridden elsewhere.
      // window.ga('send', 'pageview');
    },
  };
})();
