import React from 'react'
import TheForm from './form'

const Step1Form = ({ setActiveStep }: { setActiveStep: any }) => {
  return (
    <div>
      <TheForm setActiveStep={setActiveStep} />
    </div>
  )
}

export default Step1Form
