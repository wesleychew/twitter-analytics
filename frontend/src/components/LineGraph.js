import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function BarGraph(props) {
  return (
    <div style={{ width: "100%", height: 288 }}>
      <ResponsiveContainer width="100%">
        <LineChart data={props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Tweets"
            dot={{ strokeWidth: 2 }}
            stroke="#4a47a3"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Replies"
            dot={{ strokeWidth: 2 }}
            stroke="#f35588"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
