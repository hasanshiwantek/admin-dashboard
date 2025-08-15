import Shipments from '@/app/components/orders/shipments/Shiments'
import React from 'react'

const page = () => {
    return (
        <div >
        <div className="p-10">
          <h1 className="!text-5xl !font-extralight !text-gray-600 !my-10">View Shipments</h1>
          <p>Shipments created from your orders are shown below. Click the plus icon next to a shipment to see its complete details.</p>
          <Shipments />
        </div>
      </div>
    )
}

export default page