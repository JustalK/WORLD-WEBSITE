import { motion } from 'framer-motion'

const transition = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};

const PageTransition = ({children}) => {
return (<>
    <motion.div
      transition={{ duration: 2, type: 'tween' }}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={transition}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() => document.body.classList.remove("overflow-hidden")}>
      {children}
    </motion.div>
  </>)
};

export default PageTransition
