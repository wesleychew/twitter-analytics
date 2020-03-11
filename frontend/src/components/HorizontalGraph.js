import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function HorizontalGraph(props) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%">
        <BarChart
          width={600}
          height={300}
          data={props.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
