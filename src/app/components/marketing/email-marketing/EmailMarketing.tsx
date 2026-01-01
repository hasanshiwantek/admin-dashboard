"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
interface FormData {
  allowNewsletterSubscriptions: boolean;
  checkNewsletterBoxByDefault: boolean;
  showNewsletterSummary: boolean;
  newsletterSummaryText: string;
}

const EmailMarketing = () => {
  const { register, watch, setValue, handleSubmit } = useForm<FormData>({
    defaultValues: {
      allowNewsletterSubscriptions: true,
      checkNewsletterBoxByDefault: false,
      showNewsletterSummary: false,
      newsletterSummaryText: "",
    },
  });

  const allowNewsletterSubscriptions = watch("allowNewsletterSubscriptions");
  const showNewsletterSummary = watch("showNewsletterSummary");

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    // Handle form submission
  };

  return (
    <div className="w-full ">
      <div className="mx-auto ">
        {/* Header */}
        <div className="p-15">
          <h1 className="!font-light 2xl:!text-5xl mb-2">Email marketing</h1>
          <p className=" text-gray-600">
            Use email marketing to advertise sales, promote your business and
            market specific products{" "}
            <a href="#" className="text-blue-600 hover:underline">
              [Learn more]
            </a>
            .
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="general" className="w-full ">
          <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto px-15 w-full justify-start max-w-md">
            <TabsTrigger
              value="general"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
            >
              General settings
            </TabsTrigger>
            <TabsTrigger
              value="subscribers"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
            >
              Subscribers
            </TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Newsletter Settings Section */}
              <div className="px-15">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 ">
                  <div className="p-10">
                    <h2 className="!text-3xl !font-semibold text-gray-900 mb-6">
                      Newsletter settings
                    </h2>

                    {/* Allow newsletter subscriptions */}
                    <div className="flex items-start gap-3 py-4">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <Label className=" text-gray-700">
                          Allow newsletter subscriptions
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="allowNewsletterSubscriptions"
                          checked={allowNewsletterSubscriptions}
                          onCheckedChange={(checked) =>
                            setValue(
                              "allowNewsletterSubscriptions",
                              checked as boolean
                            )
                          }
                        />
                        <Label
                          htmlFor="allowNewsletterSubscriptions"
                          className=" text-gray-700 cursor-pointer"
                        >
                          Yes, allow customers to subscribe to the store
                          newsletter
                        </Label>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Conditional rendering based on allowNewsletterSubscriptions */}
                    {allowNewsletterSubscriptions && (
                      <>
                        {/* Check newsletter box by default */}
                        <div className="flex items-start gap-3 py-4 border-t border-gray-100">
                          <div className="flex items-center gap-3 min-w-[200px]">
                            <Label className=" text-gray-700">
                              Check newsletter box by default
                            </Label>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id="checkNewsletterBoxByDefault"
                                onCheckedChange={(checked) =>
                                  setValue(
                                    "checkNewsletterBoxByDefault",
                                    checked as boolean
                                  )
                                }
                              />
                              <Label
                                htmlFor="checkNewsletterBoxByDefault"
                                className=" text-gray-700 cursor-pointer"
                              >
                                Yes, tick the newsletter subscription box by
                                default
                              </Label>
                              <Info className="w-4 h-4 text-gray-400" />
                            </div>
                            <p className="text-xs text-gray-500 ml-6">
                              Enabling this setting places your business at risk
                              of non-compliance with privacy regulations such as
                              the EU General Data Protection Regulation (GDPR).
                            </p>
                          </div>
                        </div>

                        {/* Show newsletter summary */}
                        <div className="flex items-start gap-3 py-4 border-t border-gray-100">
                          <div className="flex items-center gap-3 min-w-[200px]">
                            <Label className=" text-gray-700">
                              Show newsletter summary
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="showNewsletterSummary"
                              checked={showNewsletterSummary}
                              onCheckedChange={(checked) =>
                                setValue(
                                  "showNewsletterSummary",
                                  checked as boolean
                                )
                              }
                            />
                            <Label
                              htmlFor="showNewsletterSummary"
                              className=" text-gray-700 cursor-pointer"
                            >
                              Yes, Enable Newsletter Summary
                            </Label>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>

                        {/* Newsletter summary textarea - conditional */}
                        {showNewsletterSummary && (
                          <div className="flex items-start gap-3 py-4 border-t border-gray-100">
                            <div className="min-w-[200px]"></div>
                            <div className="flex-1">
                              <Textarea
                                {...register("newsletterSummaryText")}
                                placeholder="Provide here basic information to your shoppers about your newsletter, including cadence and content, and third-party app of your choice so they are informed before they subscribe."
                                className="min-h-[100px] text-sm resize-none"
                                maxLength={250}
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                (250 characters max)
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Recommended Solutions Section */}
              <div className="px-15">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                  <div className="p-10">
                    <h2 className="!text-3xl !font-semibold text-gray-900 mb-6">
                      Recommended Solutions
                    </h2>

                    {/* Klaviyo Card */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="mb-4">
                        <span className="text-xs text-blue-600 font-medium">
                          Email Marketing
                        </span>
                        <div className="mt-2">
                          <svg
                            className="h-12"
                            viewBox="0 0 120 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <text
                              x="0"
                              y="24"
                              fontFamily="serif"
                              fontSize="28"
                              fontWeight="400"
                              fill="black"
                            >
                              klaviyo
                            </text>
                            <polygon
                              points="115,5 120,10 115,15"
                              fill="black"
                            />
                          </svg>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-4">
                        Centralize and use every piece of your customer data to
                        deliver hyper-personalized email and SMS experiences,
                        increasing conversions and revenue.
                      </p>

                      <ul className="space-y-2 mb-6">
                        <li className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2">•</span>
                          <span>
                            Segment in real-time using historical data, browsing
                            behavior, order value, and custom attributes - no
                            coding required
                          </span>
                        </li>
                        <li className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2">•</span>
                          <span>
                            Automate smarter with pre-built browse and cart
                            reminders, in-stock alerts, price drop
                            notifications, and more
                          </span>
                        </li>
                        <li className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2">•</span>
                          <span>
                            Sync BigCommerce customer, catalog, and order event
                            data with a one-click integration
                          </span>
                        </li>
                        <li className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2">•</span>
                          <span>
                            Track performance, predict customer behavior, get
                            actionable insights, and benchmark progress against
                            your peers
                          </span>
                        </li>
                      </ul>

                      <button className="btn-outline-primary">
                        Install now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4 shadow-lg">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 p-5 text-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-5 text-xl"
                >
                  Save
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers" className="mt-8">
            <div className="px-15">
              <div className="bg-blue-50 border-l-6 border-blue-500 p-5 mb-6">
                <p className="!text-2xl text-gray-700">
                  If you are using a third party email service, email
                  subscribers can also be synced to your email marketing
                  provider.{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Explore email marketing apps
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="p-15">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10">
                <h2 className="!text-3xl !font-semibold text-gray-900 mb-6">
                  Export Newsletter Subscribers
                </h2>

                <div className="flex items-center justify-center gap-6 py-6 border-t border-b border-gray-200">
                  <span className="text-sm text-gray-700 font-medium">
                    Subscriber Count:
                  </span>
                  <div className="text-sm text-gray-700 mb-1">
                    <span className="font-semibold">106</span> (
                    <a href="#" className="text-blue-600 hover:underline">
                      Download to CSV file
                    </a>{" "}
                    or{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      delete all subscribers
                    </a>
                    )
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmailMarketing;
