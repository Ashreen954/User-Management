import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {
  let error=useRouteError()
  console.log(error)
  return (
    <div>
      <h1 className='text-white text-center'>
        Error {error.status} {error.statusText}
      </h1>
    </div>
  )
}

export default ErrorPage