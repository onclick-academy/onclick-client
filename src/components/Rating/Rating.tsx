import * as React from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

export default function BasicRating() {
  const [value, setValue] = React.useState<number | null>(2)

  return (
    <Box
    sx={{display:"flex", gap:"3%", alignItems:"center"}}
    >
      <Typography component='legend' sx={{marginTop:"2%", color:"#9088be"}}>{value}</Typography>
      <Rating
        name="half-rating" 
        defaultValue={2.5} 
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}/>
    </Box>
  )
}