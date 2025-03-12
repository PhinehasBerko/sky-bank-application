import React from 'react'

const layout = (
    {children}:Readonly<{children:React.ReactNode}>
) => {
  return (
    <main>
        SIDEBAR
        <div className='p-2 text-success-600'>
            {children}
        </div>
        
    </main>
  )
}

export default layout