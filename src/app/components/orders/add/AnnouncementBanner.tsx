// components/AnnouncementBanner.tsx
import { Button } from "@/components/ui/button";

export default function AnnouncementBanner() {
  return (
    <div className="bg-blue-100 border-l-6 border-blue-500 p-10 shadow-sm rounded-md mb-6 ">
      <h2 >
        Now available: new add order experience
      </h2>
      <p >
        Try out the new and improved add order experience. Create an order for a storefront
        channel, support guest customers, custom shipping and all the other benefits with a new
        modern one-page flow. Note: creating an order with additional payment providers coming soon.{' '}
        <a href="#" className="text-blue-500 hover:underline">Learn more</a>
      </p>
      <div className="mt-3">
        <Button className="text-white bg-blue-600 hover:bg-blue-700 p-6 !text-2xl cursor-pointer">Take me there</Button>
      </div>
    </div>
  );
}