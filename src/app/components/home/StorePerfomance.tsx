"use client";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { fetchDashboardMetrics } from "@/redux/slices/homeSlice";
import { useAppDispatch,useAppSelector } from "@/hooks/useReduxHooks";
import { StoreMetric, StoreMetricsResponse } from "@/types/types";

export default function StorePerformanceChart() {
  const dispatch = useAppDispatch();
    const metrics = useAppSelector((state) => state.home?.metrics) as StoreMetricsResponse | null;
    const metricsData = metrics?.data ?? [];
    console.log(metricsData);

    useEffect(() => {
      dispatch(fetchDashboardMetrics());
    }, [dispatch]);

  if (!metricsData) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="my-5">Store Performance</h1>
      <div className="w-full h-100% p-4 bg-white rounded shadow">
        {/* Summary Cards */}
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
            const total = metricsData.reduce(
              (sum, m) => sum + Number(m[metric.key as keyof StoreMetric]),
              0
            );
            // const last = metricsData.reduce(
            //   (sum, m) =>
            //     sum +
            //     (m[`${metric.key}LastWeek` as keyof StoreMetric] as number),
            //   0
            // );
            // const diff = ((total - last) / (last || 1)) * 100;

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
                  {/* {last} last week's total */}
                </div>
              </div>
            );
          })}
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={metricsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            {/* <Line type="monotone" dataKey="visits" stroke="#1d4ed8" name="Visits" /> */}
            {/* <Line type="monotone" dataKey="visitsLastWeek" stroke="#d1d5db" name="Last week" strokeDasharray="4 4"/> */}
            <Line dataKey={(d) => Number(d.revenue)} stroke="#9d10b9ff" name="Revenue" />
            <Line dataKey={(d) => Number(d.orders)} stroke="#0046afff" name="Orders" />
            <Line dataKey={(d) => Number(d.visits)} stroke="#4f5050" name="Visits" />
            <Line dataKey={(d) => Number(d.conversion)} stroke="#5a9e1b" name="Conversion" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
