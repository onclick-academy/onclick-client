'use client'
import { useParams } from 'next/navigation'
import React from 'react'

export default function LecturePage() {
    const { lectureId } = useParams()

  return (
    <div>{lectureId}</div>
  )
}
