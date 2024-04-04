import React, { useState, useEffect } from 'react'
import SvgAnimate from './SvgAnimate'
import styles from './AnimatedHeader.module.scss'
export default function StylingTransition() {
  const [activeIndex, setActiveIndex] = useState(0)

  // THis staet used to pass words and svg indexes to SvgAnimate component
  const [wordsWithSvgIndexes, setWordsWithSvgIndexes] = useState([
    {
      sentence: 'From the Bottom of confusion      to the top of Succsetion',
      svgs: [0, 1, 4],
      svgStyles: [styles.firstSvg, styles.secondSvg, styles.thirdSvg]
    },
    {
      sentence: 'From humble beginnings        great success can be achieved.',
      svgs: [0, 1, 4],
      svgStyles: [styles.fourthSvg, styles.fifthSvg, styles.seventhSvg]
    },
    {
      sentence: 'From the depths of doubt, rise      to greatness',
      svgs: [3, 1, 4],
      svgStyles: [
        styles.eightSvg,
        styles.ninthSvg,
        // styles.tenthSvg,
        // styles.eleventhSvg,
        styles.twelvethSvg
      ]
    }
    // {
    //   sentence: "  OnClick          your career begins",
    //   svgs: [1, 3],
    //   svgStyles: [
    //     styles.thirteenthSvg,
    //     styles.fourteenthSvg,
    //   ],
    // },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex < wordsWithSvgIndexes.length - 1 ? prevIndex + 1 : 0))
    }, 6000) //I am controlling the speed of the animation here
    return () => clearInterval(interval)
  }, [wordsWithSvgIndexes.length])

  const [wordStates, setWordStates] = useState(wordsWithSvgIndexes.map((_, index) => index === 0))

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextState = wordStates.map((_, index) => index === activeIndex)
      setWordStates(nextState)
    }, 0)
    return () => clearTimeout(timeout)
  }, [activeIndex, wordStates])

  return (
    // some styles to be edited in scss file
    <>
      <style>{`
        @keyframes draw-from-above-${activeIndex} {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        
        }
      `}</style>
      <div style={{ position: 'relative', height: '400px' }}>
        <aside className={styles.containerStyle}>
          {wordsWithSvgIndexes.map(({ sentence, svgs, svgStyles }, index) => (
            <div
              key={index}
              className={`${styles.wordStyle} ${
                wordStates[index] ? styles.activeStyle : ''
              } ${wordStates[index] && index > 0 ? styles.animationStyle : ''}`}
            >
              <h1
                style={{
                  animation: `draw-from-above-${index} 1s ease-in-out`,
                  position: 'relative',
                  whiteSpace: 'pre',
                  zIndex: 888
                }}
                className={styles.letterStyle}
              >
                {sentence.split(' ')[0]}
              </h1>
              <h2
                style={{
                  animation: `draw-from-above-${index} 1s ease-in-out`,
                  position: 'relative',
                  whiteSpace: 'pre',
                  zIndex: 99
                }}
                className={styles.letterStyle}
              >
                {sentence.split(' ').slice(1, 11).join('\u00A0')}
              </h2>
              <h2
                style={{
                  animation: `draw-from-above-${index} 1s ease-in-out`,
                  position: 'relative',
                  whiteSpace: 'pre',
                  zIndex: 888
                }}
                className={styles.letterStyle}
              >
                {sentence.split(' ').slice(11).join('\u00A0')}
              </h2>
              <div style={{ zIndex: '1' }}>
                {svgs.map((svgIndex, idx) => (
                  <SvgAnimate key={idx} svgIndex={svgIndex} svgStyle={svgStyles[idx]} activeIndex={activeIndex} />
                ))}
              </div>{' '}
            </div>
          ))}
        </aside>
      </div>
    </>
  )
}
