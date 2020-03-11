import React, { PureComponent } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  Dot
} from "recharts";

export default class Example extends PureComponent {
  renderTooltip = props => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0] && payload[0].payload;

      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #999",
            margin: 0,
            padding: 10
          }}
        >
          <p>
            <span>Day: </span>
            {this.props.day}
          </p>
          <p>
            <span>Hour: </span>
            {data.hour}
          </p>
          <p>
            <span>Count: </span>
            {data.count}
          </p>
        </div>
      );
    }

    return null;
  };

  render() {
    // const domain = parseDomain();
    const range = [6, 200];

    return (
      <div style={{ width: "100%", height: 52 }}>
        <ResponsiveContainer width="100%">
          <ScatterChart margin={{ top: 8 }}>
            <XAxis
              type="category"
              dataKey="hour"
              interval={0}
              tick={
                this.props.day === "Sunday" ? { fontSize: 12 } : { fontSize: 0 }
              }
              //   tick={{ fontSize: 0 }}
              tickLine={{ transform: "translate(0, -6)" }}
            />
            <YAxis
              type="number"
              dataKey="index"
              name={this.props.day}
              tick={false}
              tickLine={false}
              axisLine={false}
              label={{
                value: this.props.day,
                position: "Left",
                fontSize: 12
              }}
            />
            <ZAxis
              type="number"
              dataKey="normalized"
              //   domain={domain}
              range={range}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              wrapperStyle={{ zIndex: 100 }}
              content={this.renderTooltip}
            />
            <Scatter
              data={this.props.data}
              fill="#8884d8"
              isAnimationActive={false}
            />
            <Dot></Dot>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
