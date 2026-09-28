// app/(protected)/manage/orders/shipments/page.tsx
'use client'
import React from 'react'
import Shipments from '@/app/components/orders/shipments/Shiments'

const Page = () => {
  return (
    <div >
      <div className="p-10">
        <Shipments />
      </div>
    </div>
  )
}

export default Page;