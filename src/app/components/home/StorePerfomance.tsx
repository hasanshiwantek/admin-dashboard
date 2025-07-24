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
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { StorePerformanceAPIResponse, DailyMetric } from "@/types/types";

export default function StorePerformanceChart() {
  const [metrics, setMetrics] = useState<DailyMetric[]>([]);
  const dispatch = useAppDispatch();
  const metricsData = useAppSelector(
    (state) => state.home.metrics
  ) as StorePerformanceAPIResponse | null;

  console.log("Graph Data: ", metricsData);

  useEffect(() => {
    dispatch(fetchDashboardMetrics());
  }, [dispatch]);

  // Convert API data
  useEffect(() => {
    if (metricsData?.data?.length) {
      const parsed = metricsData.data.map((item) => ({
        label: item.label,
        visits: Number(item.visits),
        orders: Number(item.orders),
        revenue: Number(item.revenue),
        conversion: Number(item.conversion),
      }));
      setMetrics(parsed);
    }
  }, [metricsData]);

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
            const total = metrics.reduce(
              (sum, m) => sum + (m[metric.key as keyof DailyMetric] as number),
              0
            );

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
                <div className="text-md text-gray-500">This week's total</div>
              </div>
            );
          })}
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#1d4ed8"
              name="Visits"
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#10b981"
              name="Orders"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#047857"
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="conversion"
              stroke="#9333ea"
              name="Conversion (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
