import React from 'react'
import Loader from '../components/Loader';

function AboutScreen() {
  return (
    <React.Suspense fallback={<Loader />}>
      <div>AboutScreen</div>
      </React.Suspense>
  )
}

export default AboutScreen