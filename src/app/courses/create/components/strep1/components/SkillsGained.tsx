import { Box, Button, Chip, TextField } from '@mui/material'
import React, { useEffect } from 'react'

interface SkillsGainedProps {
  formHook: any
  skill: string
  skills: string[]
  setSkills: (skills: string[]) => void
}

const SkillsGained = ({ formHook: { register, reset }, skill, skills, setSkills }: SkillsGainedProps) => {
  const handleRemoveSkill = skillToRemove => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleAddSkill = () => {
    const trimmedSkill = skill.trim()
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill])
      console.log('skills', skills)
      reset({ skillsGained: '' })
    }
  }
  useEffect(() => {
    console.log('Updated skills', skills)
  }, [skills])
  return (
    <form onSubmit={handleAddSkill}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {skills.map((skill, index) => (
          <Chip key={index} label={skill} onDelete={() => handleRemoveSkill(skill)} color='primary' />
        ))}
      </Box>
      <TextField {...register('skillsGained')} label='Add Skill' variant='outlined' size='small' />
      <Button type='submit' variant='contained'>
        Add
      </Button>
    </form>
  )
}

export default SkillsGained
