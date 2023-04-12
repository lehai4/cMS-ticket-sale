import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

import { data } from "../../mock/dummy";
const AreaCharts = (): JSX.Element => {
  return (
    <ResponsiveContainer height={287}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="40%" stopColor="#faa05f" stopOpacity={0.2} />
            <stop offset="74%" stopColor="#faa05f" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="gray" padding={{ left: 40 }} />
        <YAxis axisLine={false} tickMargin={20} unit="tr" width={70} />
        <CartesianGrid
          vertical={false}
          style={{
            stroke: "rgba(228,225,225)",
          }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#ff993c"
          strokeWidth={4}
          fillOpacity={1}
          fill="url(#total)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaCharts;
