import { getMessaging, getToken } from 'firebase/messaging'
import app from '../firebase'
import { fetcher } from './fetcher'

const getDeviceToken = async () => {
  const isAccessible = await Notification.requestPermission()
  console.log('isAccessible', isAccessible)
  if (isAccessible !== 'granted') {
    console.log('Notification permission is denied')
    return
  }

  const messaging = getMessaging(app)
  const deviceToken = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
  })
  return deviceToken
}

// Utility to register a device token
const registerDeviceToken = async (deviceToken: string, userId: string | null) => {
  if (!userId) {
    console.error('User ID is required to register device token')
    return false
  }

  try {
    const data = fetcher({ url: `/devicetokens/`, method: 'POST', body: { token: deviceToken, userId } })
    console.log('Device token registration response:', data)
    return true // Indicate successful registration
  } catch (error) {
    console.error('Failed to register device token:', error)
    return false // Indicate failure
  }
}

// Utility to check and handle notification permission and device token registration
const checkNotificationPermissionAndRegisterToken = async (userId: string | null) => {
  if (!userId) {
    console.error('User ID is required')
    return false
  }
  if (!('Notification' in window)) {
    console.error('This browser does not support desktop notifications')
    return false
  }

  let permissionGranted = Notification.permission === 'granted'

  if (Notification.permission === 'default') {
    const permission = await Notification.requestPermission()
    permissionGranted = permission === 'granted'
  }

  if (!permissionGranted) {
    console.log('Notification permission denied or dismissed')
    return false
  }

  // Permission is granted; proceed with device token registration
  const deviceToken = await getDeviceToken()
  if (!deviceToken) {
    console.log('No device token available')
    return false
  }

  console.log('Device Token:', deviceToken)

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/devicetokens/${userId}`, {
    method: 'GET',
    credentials: 'include'
  })
  if (!response.ok) {
    console.error('Failed to fetch device tokens:', response.statusText)
    return false
  }
  const { data: devices } = await response.json()

  const deviceRegistered = devices.some((device: any) => device.token === deviceToken)
  if (!deviceRegistered) {
    // Register the device token if it's not already registered
    return await registerDeviceToken(deviceToken, userId)
  }

  console.log('Device already registered')
  return true // Indicate that the device is already registered or just registered
}

export { checkNotificationPermissionAndRegisterToken, registerDeviceToken, getDeviceToken }
