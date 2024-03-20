import React from 'react'
import { CSSProperties } from 'react'

const linesStyle: CSSProperties = {
  strokeDasharray: '1000',
  strokeDashoffset: '1000'
}

const svgStyle: CSSProperties = {
  animationDuration: '200ms', // Example animation duration
  animationTimingFunction: 'ease-in-out', // Example timing function
  animationIterationCount: 'infinite', // Example iteration count
  animationDirection: 'alternate', // Example direction
  animationName: 'drawPath' // Example animation name
}
const svvgStyle: CSSProperties = {
  animationDuration: '200ms', // Example animation duration
  animationTimingFunction: 'ease-in-out', // Example timing function
  animationIterationCount: 'infinite', // Example iteration count
  animationDirection: 'alternate', // Example direction
  animationName: 'drawPath', // Example animation name
  zIndex: 999
}

const pathStyle: CSSProperties = {
  strokeDasharray: '1000',
  strokeDashoffset: '1000'
}

export const svgs = [
  {
    id: 'hero-arrow-3',
    className: 'hero-arrow',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 205.1 35.1',
    style: svgStyle,
    paths: [
      {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '3',
        d: 'M202.9 16.6c-7-4.5-13.2-10.3-20-15-.3-.2-.8-.2-1 .1-.2.3-.2.6 0 .9 4.1 4.7 8.6 9.1 13.5 12.9-64-1-128.6.6-192.5 2.1-2.4.1-2.4 2 0 2 64-.4 128.7-1.1 192.8-.1-2 1.2-3.9 2.6-5.8 4.1-3.1 2.3-6.7 4.9-9 8-.9 1.2.8 2.9 2 2 6.5-4.9 12.6-10.3 20-14 1.1-.6.9-2.4 0-3z',
        style: linesStyle,
        animate: {
          attributeName: 'stroke-dashoffset',
          from: '1000',
          to: '0',
          dur: '1s',
          repeatCount: '1',
          begin: '1s',
          fill: 'freeze'
        }
      }
    ]
  },
  {
    id: 'hero-circle-robotics',
    viewBox: '0 0 142.2 94.8',
    xmlns: 'http://www.w3.org/2000/svg',
    style: svgStyle,
    paths: [
      {
        fill: 'none',
        stroke: 'currentColor',
        // strokeMiterlimit: "10",
        strokeWidth: '2',
        d: 'M82.1 2.2s40.8 3.9 54.7 42.8c0 0 8 30.2-37.9 39.2 0 0-65.8 20.9-88.5-14 0 0-21-30.4 22.4-54.2 0 0 49.4-21 77.6 7.6',
        style: pathStyle,
        animate: {
          attributeName: 'stroke-dashoffset',
          from: '1000',
          to: '0',
          dur: '1s',
          repeatCount: '1',
          begin: '1s',
          fill: 'freeze'
        }
      }
    ]
  },
  {
    id: 'hero-circle-saas',
    viewBox: '0 0 242.3 94.8',
    xmlns: 'http://www.w3.org/2000/svg',
    style: svgStyle,
    paths: [
      {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '1',
        d: 'M143.9 91.1c18.4-2.9 36.8-8.1 53.6-16.5 8.7-4.4 17.3-9.2 24.7-15.5 7.6-6.4 18.5-15.2 15.5-25.8-2.8-9.7-13.4-14.7-22.7-17.5-9.5-2.6-19.1-4.7-28.8-6.2C164.8 6 143 4.2 121.3 4.4c-21.4.3-42.8 1.9-63.9 6.2-17.7 3.7-39.8 10.8-49.5 26.9C-3.3 56 22.3 71.3 36.7 76.7c13.5 5.1 27.6 7.2 42.2 8.2 34.5 2.5 74.2-.9 106.1-16.5 2.3-1.1 4.4 1.8 2.1 3.1C156.3 87.9 117 90.9 83.1 89c-16.3-.9-32.2-2.8-47.4-8.2-15.1-5.5-36.1-16.9-35-35 .5-8.8 6.5-16.3 13.4-21.7 8.2-6.4 17.9-10.3 27.8-13.4 21.8-6.7 46.5-8.4 69-9.3 24.1-1 48.3.4 72.1 4.2 11.1 1.7 22.1 4.1 33 7.2 8.3 2.5 15.8 6.3 20.6 13.4 5.2 7.8 4.4 16.5-2.1 23.7-7.8 8.5-16.8 15.8-26.8 21.6-19.5 11.3-41.8 17.2-63.9 20.6-.8.2-.8-.9.1-1',
        style: pathStyle,
        animate: {
          attributeName: 'stroke-dashoffset',
          from: '1000',
          to: '0',
          dur: '1s',
          repeatCount: '1',
          begin: '1s',
          fill: 'freeze'
        }
      }
    ]
  },
  {
    id: 'hero-line-robotics',
    viewBox: '0 0 438.6 26.9',
    xmlns: 'http://www.w3.org/2000/svg',
    style: svvgStyle,
    paths: [
      {
        fill: 'none',
        stroke: 'currentColor',
        strokeMiterlimit: '10',
        strokeWidth: '6',
        d: 'M7.7 6s411.4-.5 422.9.4C249.7 10.9 197.6 9.7 40.9 21',
        clipPath: 'url(#hero-line-robotics-b)',
        style: linesStyle,
        animate: {
          attributeName: 'stroke-dashoffset',
          from: '500',
          to: '0',
          dur: '1s',
          repeatCount: '1',
          begin: '1s',
          fill: 'freeze'
        }
      }
    ]
  }
]
