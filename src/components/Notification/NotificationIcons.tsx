import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import {
  School as SchoolIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  NewReleases as NewReleasesIcon,
  Announcement as AnnouncementIcon,
  RateReview as RateReviewIcon,
  Event as EventIcon,
  ThumbUpAlt as ThumbUpAltIcon,
  ThumbDownAlt as ThumbDownAltIcon,
  Block as BlockIcon
  // other icons you might use
} from '@mui/icons-material'

export const getNotificationIcon = type => {
  const iconProps = { style: { fontSize: '25px' } } // Adjust icon size as needed
  switch (type) {
    case 'COURSE_ENROLLMENT':
      return <SchoolIcon style={{ ...iconProps.style, color: '#4CAF50' }} />
    case 'COURSE_COMPLETION':
      return <CheckCircleOutlineIcon style={{ ...iconProps.style, color: '#2196F3' }} />
    case 'NEW_COURSE_AVAILABLE':
      return <NewReleasesIcon style={{ ...iconProps.style, color: '#FF9800' }} />
    case 'ADMIN_ANNOUNCEMENT':
      return <AnnouncementIcon style={{ ...iconProps.style, color: '#FFEB3B' }} />
    case 'REVIEW_COURSE':
      return <RateReviewIcon style={{ ...iconProps.style, color: '#03A9F4' }} />
    case 'NEW_EVENT':
      return <EventIcon style={{ ...iconProps.style, color: '#9C27B0' }} />
    case 'REQUEST_APPROVED':
      return <ThumbUpAltIcon style={{ ...iconProps.style, color: '#009688' }} />
    case 'REQUEST_DECLINED':
      return <ThumbDownAltIcon style={{ ...iconProps.style, color: '#F44336' }} />
    case 'SUSPEND_USER':
      return <BlockIcon style={{ ...iconProps.style, color: '#B71C1C' }} />
    default:
      return <SchoolIcon style={{ ...iconProps.style, color: '#757575' }} /> // default icon
  }
}
