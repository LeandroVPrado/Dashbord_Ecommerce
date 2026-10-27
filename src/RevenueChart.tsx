import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export default function RevenueChart({
  data,
}: {
  data: { day: string; atual: number; anterior: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ left: -5, right: 8, top: 12, bottom: 0 }}
      >
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7856e8" stopOpacity={0.19} />
            <stop offset="100%" stopColor="#7856e8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          stroke="#eeedf3"
          strokeDasharray="4 4"
        />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          minTickGap={30}
          tick={{ fontSize: 11, fill: "#91929e" }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "#91929e" }}
          tickFormatter={(v) =>
            `${(v / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mil`
          }
        />
        <Tooltip
          formatter={(value) => money(Number(value))}
          labelStyle={{ color: "#383443" }}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #eee",
            fontSize: 12,
          }}
        />
        <Area
          isAnimationActive={false}
          name="Mês anterior"
          type="monotone"
          dataKey="anterior"
          stroke="#c8c2dc"
          strokeDasharray="5 5"
          fill="transparent"
          strokeWidth={2}
        />
        <Area
          isAnimationActive={false}
          name="Receita"
          type="monotone"
          dataKey="atual"
          stroke="#7856e8"
          fill="url(#revenueFill)"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
