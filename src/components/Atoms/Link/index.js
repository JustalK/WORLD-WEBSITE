import React, {forwardRef} from 'react'

const Link = forwardRef(({children, className, onPointerEnter, onPointerOut, onClick}, ref) => {
  return (
    <div ref={ref} onPointerEnter={onPointerEnter} onPointerOut={onPointerOut} className={className} onClick={onClick}>
      {children}
    </div>
  )
})

export default Link;
