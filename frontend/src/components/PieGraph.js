import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#DFD67F",
  "#DE5F1F",
  "#4a47a3",
  "#628359",
  "#f35588"
];

export default function PieGraph(props) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%">
        <PieChart width={800} height={400}>
          <Pie
            isAnimationActive={false}
            data={props.data}
            cy={128}
            outerRadius={108}
            dataKey="Probability"
            nameKey="Country"
          >
            {props.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
