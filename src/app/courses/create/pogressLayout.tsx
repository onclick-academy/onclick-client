'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Step 1', 'Step 2', 'Step 3'];
export default function Layout({ children, activeStep }) {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 5
        }}
      >
        {children}
      </Box>
    </>
  );
}
