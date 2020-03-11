import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Text,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "white",
          borderStyle: "solid",
          borderColor: "#999",
          borderWidth: 1,
          paddingLeft: 16,
          paddingRight: 16,
          marginTop: 2,
          marginBottom: 2
        }}
      >
        <p>Tweet Date: {`${label} `}</p>
        <p>Sentiment Score: {`${payload[0].value}`}</p>
        <p style={{ color: `${payload[0].value}` < 0 ? "#f35588" : "#55A68F" }}>
          <b>{`${payload[0].payload.tweet}`}</b>
        </p>
      </div>
    );
  }

  return null;
};

export default function SentimentGraph(props) {
  return (
    <div style={{ width: "100%", height: 458 }}>
      <ResponsiveContainer width="100%">
        <BarChart
          width={500}
          height={400}
          data={props.data}
          isAnimationActive={false}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" interval={10} />
          <YAxis
            orientation="left"
            label={
              <Text x={42} y={248} dx={0} dy={0} offset={0} angle={-90}>
                Sentiment Score
              </Text>
            }
            domain={[-1, 1]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="score" fill="#82ca9d">
            {props.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                //   stroke={colors[index]}
                fill={entry.score > 0 ? "#79bd8f" : "#f35588"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
