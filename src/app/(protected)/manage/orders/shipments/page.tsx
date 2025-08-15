// app/(protected)/manage/orders/shipments/page.tsx
'use client'
import Shipments from '@/app/components/orders/shipments/Shiments'
import React, {useState} from 'react'

const Page = () => {
  const [isSearch, setIsSearch] = useState(false);

    return (
        <div >
        <div className="p-10">
      <h1 className="!text-5xl !font-extralight !text-gray-600 !my-10">
        {isSearch ? 'Search Shipments' : 'View Shipments'}
      </h1>
      <p>
        {isSearch
          ? 'Use filters and keywords to find specific shipments.'
          : 'Shipments created from your orders are shown below. Click the plus icon next to a shipment to see its complete details.'}
      </p>

      <Shipments onSearchModeChange={setIsSearch} />
    </div>
      </div>
    )
}

export default Page;