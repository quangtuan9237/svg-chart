import React from "react";

const CHART_TYPE = {
  bars: "bars",
  line: "line",
};

function withDataArray(Comp) {
  return ({ data, ...rest }) => {
    let newData = React.useMemo(() => {
      if (!Array.isArray(data)) {
        return data.split(",");
      }

      return data;
    }, [data]);

    return <Comp {...rest} data={newData} />;
  };
}

function LineChart({ data, color, width, height, ...rest }) {
  const pointDistant = width / (data.length - 1);
  const maxValue = Math.max(...data);

  let points = data.map((value, index) => {
    let x = index * pointDistant;
    let y = height - (height / maxValue) * value;

    return [x, y].join(",");
  });

  points = [`${-20}, ${height}`, ...points, `${width + 20}, ${height}`].join(
    " "
  );

  return (
    <svg
      {...rest}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
    >
      <polyline
        fill={getOppacityColor(color, 0.2)}
        stroke={color}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
}

function BarChart({ data, color, width, height, ...rest }) {
  const barWidth = width / data.length;
  const maxValue = Math.max(...data);

  return (
    <svg
      {...rest}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
    >
      {data.map((value, index) => {
        let x = Math.round(index * barWidth);
        let barHeight = (height / maxValue) * value;

        return (
          <rect
            key={index}
            x={x}
            y={height - barHeight}
            fill={color}
            height={barHeight}
            width={barWidth + 1}
          ></rect>
        );
      })}
    </svg>
  );
}

function Chart({ mode, ...rest }) {
  if (mode === CHART_TYPE.bars) {
    return <BarChart {...rest} />;
  } else if (mode === CHART_TYPE.line) {
    return <LineChart {...rest} />;
  } else {
    return <p>'{mode}' chart is not supported</p>;
  }
}

export default withDataArray(Chart);

function getOppacityColor(hex, opacity) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      `,${opacity})`
    );
  }
  throw new Error("Bad Hex");
}
