/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useState, useRef, memo} from 'react';
import ThemedImage from '@theme/ThemedImage';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import './styles.css';
import styles from './styles.module.css';

const Dark = ({icon, style}) => (
  <span className={clsx(styles.toggle, styles.dark)} style={style}>
    <ThemedImage sources={icon} />
  </span>
);

const Light = ({icon, style}) => (
  <span className={clsx(styles.toggle, styles.light)} style={style}>
    <ThemedImage sources={icon} />
  </span>
); // Based on react-toggle (https://github.com/aaronshaf/react-toggle/).

const LsToggle = memo(
  ({className, icons, checked: defaultChecked, disabled, onChange}) => {
    const [checked, setChecked] = useState(defaultChecked); // const [focused, setFocused] = useState(false);

    const inputRef = useRef(null);
    return (
      <div
        className={clsx('react-toggle', className, {
          'react-toggle--checked': checked,
          // 'react-toggle--focus': focused,
          'react-toggle--disabled': disabled,
        })}>
        <div
          className="react-toggle-track"
          role="button"
          tabIndex={-1}
          onClick={() => inputRef.current?.click()}>
          <div className="react-toggle-track-check">{icons.checked}</div>
          <div className="react-toggle-track-x">{icons.unchecked}</div>
          {/* <div className="react-toggle-thumb" /> */}
        </div>

        <input
          ref={inputRef}
          checked={checked}
          type="checkbox"
          className="react-toggle-screenreader-only"
          aria-label="Switch between dark and light mode"
          onChange={onChange}
          onClick={() => setChecked(!checked)} // onFocus={() => setFocused(true)}
          // onBlur={() => setFocused(false)}
        />
      </div>
    );
  },
);
export default function (props) {
  const {
    colorMode: {
      switchConfig: {darkIcon, darkIconStyle, lightIcon, lightIconStyle},
    },
  } = useThemeConfig();
  const {isClient} = useDocusaurusContext();
  return (
    <LsToggle
      disabled={!isClient}
      icons={{
        checked: (
          <Light
            icon={{
              light: useBaseUrl(lightIcon.light),
              dark: useBaseUrl(lightIcon.dark),
            }}
            style={lightIconStyle}
          />
        ),
        unchecked: (
          <Dark
            icon={{
              light: useBaseUrl(darkIcon.light),
              dark: useBaseUrl(darkIcon.dark),
            }}
            style={darkIconStyle}
          />
        ),
      }}
      {...props}
    />
  );
}
