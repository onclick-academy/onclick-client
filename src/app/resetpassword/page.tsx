import ResetPasswordForm from '@/components/Form/ResetPassword'
import React from 'react'
import { Suspense } from 'react'

const ResetPasswordPage = () => {
  return (
    <Suspense>
      <ResetPasswordForm />;
    </Suspense>
  )
}

export default ResetPasswordPage
