"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _themeCommon = require("@docusaurus/theme-common");

var _useLockBodyScroll = _interopRequireDefault(require("@theme/hooks/useLockBodyScroll"));

var _useWindowSize = _interopRequireWildcard(require("@theme/hooks/useWindowSize"));

var _SubNavbarItem = _interopRequireDefault(require("@theme/SubNavbarItem"));

var _reactRouterDom = require("react-router-dom");

require("./styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// import useThemeContext from '@theme/hooks/useThemeContext';
function SubNavbar() {
  const {
    subNavbar
  } = (0, _themeCommon.useThemeConfig)();
  const location = (0, _reactRouterDom.useLocation)();
  const [sidebarShown, setSidebarShown] = (0, _react.useState)(false); // const {isDarkTheme, setLightTheme, setDarkTheme} = useThemeContext();

  (0, _useLockBodyScroll.default)(sidebarShown);
  const windowSize = (0, _useWindowSize.default)();
  (0, _react.useEffect)(() => {
    if (windowSize === _useWindowSize.windowSizes.desktop) {
      setSidebarShown(false);
    }
  }, [windowSize]);
  return <>
      <nav className={(0, _clsx.default)('navbar', 'subnavbar--fixed-top', 'sub-navbar')}>
        <div className="navbar__inner subnavbar__inner">
          <div className="navbar__items">
            {subNavbar.map(sub => {
            if (location.pathname.indexOf(sub.dirName || '') >= 0) {
              return sub.items.map((item, i) => <_SubNavbarItem.default dirname={sub.dirName} {...item} key={i} />);
            } else {
              return <></>;
            }
          })}
          </div>
        </div>
      </nav>
    </>;
}

var _default = SubNavbar;
exports.default = _default;