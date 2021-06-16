import React, {forwardRef} from 'react'

const Link = forwardRef(({children, className, onPointerEnter, onPointerOut, onPointerMove, onClick}, ref) => {
  return (
    <div ref={ref} onPointerEnter={onPointerEnter} onPointerOut={onPointerOut} onPointerMove={onPointerMove} className={className} onClick={onClick}>
      {children}
    </div>
  )
})

export default Link;
