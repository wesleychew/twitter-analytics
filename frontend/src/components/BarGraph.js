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

export default function BarGraph(props) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%">
        <BarChart data={props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={Object.keys(props.data[0])[1]}
            interval={0}
            style={{ fontSize: "12px" }}
          />
          <YAxis style={{ fontSize: "12px" }} domain={props.domain} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey={Object.keys(props.data[0])[0]} fill="#79bd8f" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
