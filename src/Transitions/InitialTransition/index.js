import { motion } from 'framer-motion'

const blackBox = {
  initial: {
    height: '100vh'
  },
  animate: {
    height: 0,
    transition: {
      when: "afterChildren",
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    }
  },
};

const textContainer = {
  initial: {
    opacity: 1
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.25,
      when: "afterChildren",
    },
  },
};

const text = {
  initial: {
    y: 40,
  },
  animate: {
    y: 80,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const InitialTransition = () => {
return (<>
    <motion.div
      className='black-screen'
      transition={{ duration: 2, type: 'tween' }}
      initial='initial'
      animate='animate'
      variants={blackBox}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() => document.body.classList.remove("overflow-hidden")}>
      <motion.svg variants={textContainer} className="absolute z-50 flex">
        <pattern
          id="pattern"
          patternUnits="userSpaceOnUse"
          width={750}
          height={800}
          className="text-white"
        >
          <rect className="rect-current" />
          <motion.rect variants={text} className="rect-anim" />
        </pattern>
        <text
          className="text-4xl font-bold"
          text-anchor="middle"
          x="50%"
          y="50%"
          style={{ fill: "url(#pattern)" }}>
          Justal Kevin
        </text>
      </motion.svg>
    </motion.div>
  </>)
};

export default InitialTransition
