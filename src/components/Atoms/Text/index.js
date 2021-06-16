import React from 'react'

export default function Text({children, className}) {
  return (
    <span className={className}>
      {children}
    </span>
  )
}
