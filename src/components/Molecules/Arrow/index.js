import React from 'react'

const Arrow = ({children, className}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="-4 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  )
}

export default Arrow;
