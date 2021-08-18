import React from 'react'

export default ({ className, text, name }) => (
  <span className={`gt-ico ${className}`}>
    <span className="gt-svg" />
    {
      text && <span className="gt-ico-text">{text}</span>
    }
  </span>
)
