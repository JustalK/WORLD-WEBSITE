import { motion } from 'framer-motion'

const enter = {
  initial: {
    width: '100%'
  },
  animate: {
    width: '0',
    transition: {
      when: "afterChildren",
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    }
  }
};

const exit = {
  exit: {
    width: '100%',
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    }
  },
};

const BlackTransition = () => {
return (<>
    <motion.div
      className='black-screen-enter'
      transition={{ duration: 2, type: 'tween' }}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={enter}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() => document.body.classList.remove("overflow-hidden")}>
    </motion.div>
    <motion.div
      className='black-screen-exit'
      transition={{ duration: 2, type: 'tween' }}
      exit='exit'
      variants={exit}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() => document.body.classList.remove("overflow-hidden")}>
    </motion.div>
  </>)
};

export default BlackTransition
