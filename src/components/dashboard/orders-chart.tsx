"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { CardContent } from "../ui/card";

const data = [
  {
    day: "Pzt",
    orders: 12,
  },
  {
    day: "Sal",
    orders: 19,
  },
  {
    day: "Çrş",
    orders: 15,
  },
  {
    day: "Prş",
    orders: 24,
  },
  {
    day: "Cum",
    orders: 31,
  },
  {
    day: "Cts",
    orders: 18,
  },
  {
    day: "Paz",
    orders: 22,
  },
];

export function OrdersChart() {
  return (
    <div className="h-[260px] lg:h-[320px] w-full">
      <CardContent className="h-[350px]">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />

              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="day" tickLine={false} axisLine={false} />

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
      </CardContent>
    </div>
  );
}
