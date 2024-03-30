'use client'
import { fetcher } from '@/utilities/fetcher'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Aside } from './SettingsAside'
import Navbar from '@/components/Nav/Nav'
import { Box, Button, FormControl, TextField, MenuItem, Select, InputLabel, Avatar } from '@mui/material'
import Image from 'next/image'
import PersonalData from './PersonalData'
import PublicProfile from './PublicProfile'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('personalData')
  const [userData, setUserData] = useState(null)
 
  useEffect(() => {
    const getUserData = async () => {
      const res = await fetcher({ url: '/users/userinfo' })
      return res
    }

    const fetchData = async () => {
      const fetchedUserData = await getUserData()
      setUserData(fetchedUserData.data)
    }
    fetchData()
  }, [])


  const handlePersonalData = () => {
    setActiveTab('personalData')
  }

  const handlePublicData = () => {
    setActiveTab('publicData')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '70%',
          height: '70%',
          margin: 'auto'
        }}
      >
        <div style={{ width: '100%', height: '100%', margin: 'auto', display: 'flex', gap: '2rem' }}>
          <Aside />
          <div className='settings_body'>
            <div className='settings_btns'>
              <div onClick={handlePersonalData}>Personal Data</div>

              <div onClick={handlePublicData}>Public Profile</div>
            </div>

            <div className='settings_btn_body'>
              {activeTab === 'personalData' && (
               <PersonalData userData={userData}/>
              )}
              {activeTab === 'publicData' && (
               <PublicProfile userData={userData}/>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
