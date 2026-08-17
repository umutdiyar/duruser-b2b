"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

type OrdersChartProps = {
  data: { day: string; orders: number }[];
};

export function OrdersChart({ data }: OrdersChartProps) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      initialDimension={{ width: 700, height: 300 }}
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.35} />

            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        <XAxis dataKey="day" tickLine={false} axisLine={false} interval={0} />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="orders"
          stroke="#f97316"
          fillOpacity={1}
          fill="url(#colorOrders)"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
