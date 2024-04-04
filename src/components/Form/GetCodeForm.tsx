import { Button, FormControl, FormLabel, Input, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

export function GetCode({ register }) {
  const mediaQuery = useMediaQuery('(max-width: 800px)') //done
  const router = useRouter()

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        background: 'linear-gradient(to left, #181717, #09161f)',
        padding: '5%',
        borderRadius: '35px',
        alignItems: 'center'
      }}
    >
      <h2 style={{ color: '#FFF' }}>Please Enter enter your code.</h2>

      <div style={{ margin: mediaQuery ? '0 auto' : '0', width: '100%' }}>
        <FormControl key={'code'}>
          <Input
            id='code'
            type='code'
            {...register('code', {
              required: 'This is required'
            })}
            placeholder='Code'
          />
          {/* <FormHelperText error>{errors.email?.message}</FormHelperText> */}
        </FormControl>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: mediaQuery ? '0 auto' : '0',
          width: mediaQuery ? '80%' : '100%'
        }}
      >
        <Button type='submit' variant='contained' style={{ width: '42%', background: '#031999' }}>
          Submit
        </Button>
        <Button variant='contained' onClick={() => router.push('/')} style={{ width: '42%', background: '#031999' }}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
