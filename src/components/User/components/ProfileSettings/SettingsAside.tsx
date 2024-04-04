import React from 'react'
import '../../settings.css'
export function Aside() {
  const currentUrl = 'http://localhost:3001/user/settings'

  return (
    <aside>
      <div className='aside_container'>
        <div className='aside_header'>
          <h2>Settings</h2>
        </div>
        <div className='aside_body'>
          <ul>
            <li className={currentUrl === 'http://localhost:3001/user/settings' ? 'active' : ''}>
              <a href='http://localhost:3001/user/settings'>Profile Settings</a>
            </li>
            <li
            //   className={
            //     currentUrl === "http://localhost:3001/user/settings/security" ? "active" : ""
            //   }
            >
              <a href='http://localhost:3001/user/settings/security'>Security</a>
            </li>
            <li
            //   className={
            //     currentUrl === "http://localhost:3001/user/settings/notifications" ? "active" : ""
            //   }
            >
              <a href='http://localhost:3001/user/settings/notifications'>Notifications</a>
            </li>
            <li
            //   className={
            //     currentUrl === "http://localhost:3001/user/settings/billing" ? "active" : ""
            //   }
            >
              <a href='http://localhost:3001/user/settings/billing'>Billing</a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
