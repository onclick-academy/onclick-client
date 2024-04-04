import React from 'react'
import { motion } from 'framer-motion'

const AnimatedBackground = ({ children }) => {
  return (
    <motion.div
      style={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(to bottom, #0a192f, #112240)'
      }}
      animate={{
        background: [
          'linear-gradient(to bottom, #0a192f, #112240)',
          'linear-gradient(to bottom, #112240, #1b2a4a)',
          'linear-gradient(to bottom, #1b2a4a, #243456)'
        ]
      }}
      transition={{
        duration: 1,
        loop: Infinity,
        repeat: Infinity,
        repeatDelay: 1,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedBackground
