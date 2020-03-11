import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Text,
  Label,
  ResponsiveContainer
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
        <p style={{ marginTop: 8, marginBottom: 4 }}>
          Retweets: {`${payload[0].payload.retweets.toLocaleString()}`}
        </p>
        <p style={{ marginTop: 4, marginBottom: 4 }}>
          Likes: {`${payload[0].payload.likes.toLocaleString()}`}
        </p>
        <p style={{ marginTop: 4, marginBottom: 4 }}>
          Count: {`${payload[0].payload.count.toLocaleString()}`}
        </p>
        <p style={{ color: "#8884d8", marginTop: 4, marginBottom: 8 }}>
          Hashtag: {`${payload[0].payload.hashtag}`}
        </p>
      </div>
    );
  }

  return null;
};

export default function ScatterGraph(props) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%">
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="retweets"
            interval={props.log[1] ? 10 : 2}
            scale={props.log[1] ? "log" : "auto"}
            domain={["auto", "auto"]}
          >
            <Label value="retweets" offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis
            padding={{ top: 12 }}
            type="number"
            dataKey="likes"
            interval={props.log[1] ? 10 : 2}
            orientation="left"
            scale={props.log[1] ? "log" : "auto"}
            domain={["auto", "auto"]}
            label={
              <Text x={16} y={-30} dx={0} dy={188} offset={10} angle={-90}>
                Likes
              </Text>
            }
          />

          <ZAxis type="number" dataKey="count" range={[60, 400]} name="count" />
          <Tooltip content={<CustomTooltip />} />

          <Scatter
            name="Hashtags"
            data={props.data}
            fill="#8884d8"
            isAnimationActive={false}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
