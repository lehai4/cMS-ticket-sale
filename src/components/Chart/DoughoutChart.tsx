import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Wrapper from "../Wrapper";

interface Props {
  data: object[];
  title: string;
}

const COLORS = ["#4F75FF", "#FF8A48"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {value}
    </text>
  );
};

const DoughnutChart = ({ data, title }: Props): JSX.Element => {
  return (
    <Wrapper className="chart">
      <p className="text-center text-slate-900 font-bold">{title}</p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            startAngle={-270}
            innerRadius={60}
            outerRadius={123}
            stroke="none"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default DoughnutChart;
