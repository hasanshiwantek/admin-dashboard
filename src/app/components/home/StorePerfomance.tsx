"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { fetchDashboardMetrics } from "@/redux/slices/homeSlice";
import { useAppDispatch,useAppSelector } from "@/hooks/useReduxHooks";

interface StoreMetric {
  date: string;
  revenue: number;
  orders: number;
  visits: number;
}

interface DailyMetric {
  day: string; // "Sun", "Mon", etc.
  visits: number;
  visitsLastWeek: number;
  orders: number;
  ordersLastWeek: number;
  revenue: number;
  revenueLastWeek: number;
  conversion: number; // in percent
  conversionLastWeek: number;
}

export default function StorePerformanceChart() {
  const [metrics, setMetrics] = useState<DailyMetric[]>([]);
  const dispatch = useAppDispatch();
    const metricsData = useAppSelector((state) => state.home.metrics);
    console.log(metricsData);
    

  const dummyMetrics: DailyMetric[] = [
    {
      day: "Sun",
      visits: 100,
      visitsLastWeek: 120,
      orders: 3,
      ordersLastWeek: 1,
      revenue: 400,
      revenueLastWeek: 500,
      conversion: 0.5,
      conversionLastWeek: 0.6,
    },
    {
      day: "Mon",
      visits: 200,
      visitsLastWeek: 230,
      orders: 6,
      ordersLastWeek: 5,
      revenue: 610,
      revenueLastWeek: 460,
      conversion: 0.8,
      conversionLastWeek: 0.5,
    },
    {
      day: "Tues",
      visits: 210,
      visitsLastWeek: 240,
      orders: 7,
      ordersLastWeek: 6,
      revenue: 620,
      revenueLastWeek: 470,
      conversion: 0.9,
      conversionLastWeek: 0.7,
    },
    {
      day: "Wed",
      visits: 220,
      visitsLastWeek: 220,
      orders: 4,
      ordersLastWeek: 2,
      revenue: 600,
      revenueLastWeek: 475,
      conversion: 0.7,
      conversionLastWeek: 0.9,
    },
    {
      day: "Thurs",
      visits: 230,
      visitsLastWeek: 250,
      orders: 8,
      ordersLastWeek: 3,
      revenue: 630,
      revenueLastWeek: 480,
      conversion: 0.4,
      conversionLastWeek: 0.4,
    },
    {
      day: "Fri",
      visits: 235,
      visitsLastWeek: 255,
      orders: 2,
      ordersLastWeek: 7,
      revenue: 635,
      revenueLastWeek: 485,
      conversion: 0.3,
      conversionLastWeek: 0.3,
    },
    {
      day: "Sat",
      visits: 240,
      visitsLastWeek: 260,
      orders: 1,
      ordersLastWeek: 1,
      revenue: 540,
      revenueLastWeek: 495,
      conversion: 0.2,
      conversionLastWeek: 0.2,
    },
  ];

    useEffect(() => {
      dispatch(fetchDashboardMetrics());
    }, [dispatch]);

  useEffect(() => {
    setMetrics(dummyMetrics);
  }, []);

  return (
    <div>
      <h1 className="my-5">Store Performance</h1>
      <div className="w-full h-100% p-4 bg-white rounded shadow">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Visits", key: "visits", color: "text-blue-600" },
            {
              label: "Conversion",
              key: "conversion",
              color: "text-purple-600",
              suffix: "%",
            },
            { label: "Orders", key: "orders", color: "text-green-600" },
            {
              label: "Revenue",
              key: "revenue",
              color: "text-emerald-600",
              prefix: "$",
            },
          ].map((metric) => {
            const total = dummyMetrics.reduce(
              (sum, m) => sum + (m[metric.key as keyof DailyMetric] as number),
              0
            );
            const last = dummyMetrics.reduce(
              (sum, m) =>
                sum +
                (m[`${metric.key}LastWeek` as keyof DailyMetric] as number),
              0
            );
            const diff = ((total - last) / (last || 1)) * 100;

            return (
              <div
                key={metric.key}
                className="p-4 bg-gray-50 border rounded shadow-sm"
              >
                <div className="text-xl font-medium text-gray-600">
                  {metric.label}
                </div>
                <div className={`text-[2rem] font-semibold ${metric.color}`}>
                  {metric.prefix || ""}
                  {metric.suffix ? total.toFixed(2) : Math.round(total)}
                  {metric.suffix || ""}
                </div>
                <div className="text-md text-gray-500">
                  {last} last week's total
                </div>
              </div>
            );
          })}
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dummyMetrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#1d4ed8"
              name="This week"
            />
            <Line
              type="monotone"
              dataKey="visitsLastWeek"
              stroke="#d1d5db"
              name="Last week"
              strokeDasharray="4 4"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 'use client';

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
// } from 'recharts';
// import { useEffect, useState } from 'react';

// // Weekday labels
// const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// interface MetricData {
//   day: string;
//   visitsThis: number;
//   visitsLast: number;
//   conversionThis: number;
//   conversionLast: number;
//   ordersThis: number;
//   ordersLast: number;
//   revenueThis: number;
//   revenueLast: number;
// }

// export default function StorePerformance() {
//   const [data, setData] = useState<MetricData[]>([]);

//   useEffect(() => {
//     // Replace this later with API call
//     const dummy: MetricData[] = days.map((day, index) => ({
//       day,
//       visitsThis: Math.floor(Math.random() * 500 + 300),
//       visitsLast: Math.floor(Math.random() * 500 + 300),
//       conversionThis: parseFloat((Math.random() * 2).toFixed(2)),
//       conversionLast: parseFloat((Math.random() * 2).toFixed(2)),
//       ordersThis: Math.floor(Math.random() * 15 + 5),
//       ordersLast: Math.floor(Math.random() * 15 + 5),
//       revenueThis: parseFloat((Math.random() * 2000 + 1000).toFixed(2)),
//       revenueLast: parseFloat((Math.random() * 2000 + 1000).toFixed(2)),
//     }));

//     setData(dummy);
//   }, []);

//   // Calculate totals for cards
//   const totals = {
//     visits: {
//       this: data.reduce((sum, d) => sum + d.visitsThis, 0),
//       last: data.reduce((sum, d) => sum + d.visitsLast, 0),
//     },
//     conversion: {
//       this: (data.reduce((sum, d) => sum + d.conversionThis, 0) / data.length).toFixed(2),
//       last: (data.reduce((sum, d) => sum + d.conversionLast, 0) / data.length).toFixed(2),
//     },
//     orders: {
//       this: data.reduce((sum, d) => sum + d.ordersThis, 0),
//       last: data.reduce((sum, d) => sum + d.ordersLast, 0),
//     },
//     revenue: {
//       this: data.reduce((sum, d) => sum + d.revenueThis, 0).toFixed(2),
//       last: data.reduce((sum, d) => sum + d.revenueLast, 0).toFixed(2),
//     },
//   };

//   return (
//     <div className="p-6 bg-white rounded shadow space-y-6">
//       <h2 className="text-2xl font-semibold">Store Performance</h2>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         <MetricCard title="Visits" value={totals.visits.this} sub={`Last: ${totals.visits.last}`} />
//         <MetricCard title="Conversion" value={`${totals.conversion.this}%`} sub={`Last: ${totals.conversion.last}%`} />
//         <MetricCard title="Orders" value={totals.orders.this} sub={`Last: ${totals.orders.last}`} />
//         <MetricCard title="Revenue" value={`$${totals.revenue.this}`} sub={`Last: $${totals.revenue.last}`} />
//       </div>

//       {/* Chart */}
//       <div className="w-full h-96">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="visitsThis" stroke="#0070f3" name="Visits (This week)" />
//             <Line type="monotone" dataKey="visitsLast" stroke="#ccc" name="Visits (Last week)" />
//             <Line type="monotone" dataKey="revenueThis" stroke="#22c55e" name="Revenue (This week)" />
//             <Line type="monotone" dataKey="revenueLast" stroke="#cbd5e1" name="Revenue (Last week)" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// function MetricCard({ title, value, sub }: { title: string; value: string | number; sub?: string }) {
//   return (
//     <div className="p-4 bg-gray-100 rounded shadow-sm">
//       <h3 className="text-sm text-gray-500">{title}</h3>
//       <p className="text-xl font-semibold">{value}</p>
//       {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
//     </div>
//   );
// }
