import React, { forwardRef } from 'react'

const Text = forwardRef(({children, className}, ref) => {
  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  )
})

export default Text;
