/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useState, useEffect} from 'react';
import clsx from 'clsx'; // import useThemeContext from '@theme/hooks/useThemeContext';

import {useThemeConfig} from '@docusaurus/theme-common';
import useLockBodyScroll from '@theme/hooks/useLockBodyScroll';
import useWindowSize, {windowSizes} from '@theme/hooks/useWindowSize';
import SubNavbarItem from '@theme/SubNavbarItem';
import {useLocation} from 'react-router-dom';
import './styles.css';

function SubNavbar() {
  const {subNavbar} = useThemeConfig();
  const location = useLocation();
  const [sidebarShown, setSidebarShown] = useState(false); // const {isDarkTheme, setLightTheme, setDarkTheme} = useThemeContext();

  useLockBodyScroll(sidebarShown);
  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize === windowSizes.desktop) {
      setSidebarShown(false);
    }
  }, [windowSize]);
  return (
    <>
      <nav className={clsx('navbar', 'subnavbar--fixed-top', 'sub-navbar')}>
        <div className="navbar__inner subnavbar__inner">
          <div className="navbar__items">
            {subNavbar.map((sub) => {
              if (location.pathname.indexOf(sub.dirName || '') >= 0) {
                return sub.items.map((item, i) => (
                  <SubNavbarItem dirname={sub.dirName} {...item} key={i} />
                ));
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

export default SubNavbar;
