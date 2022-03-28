import React from 'react'
import Loader from '../components/Loader';

function HomeScreen() {
  return (
    <React.Suspense fallback={<Loader />}>

      <div>HomeScreen</div>
      </React.Suspense>
  )
}

export default HomeScreen