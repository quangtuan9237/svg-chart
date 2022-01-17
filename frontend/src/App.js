import Chart from "./Chart";

function App() {
  const data = [
    1, 5, 3, 9, 7, 11, 10, 17, 14, 16, 14, 19, 18, 16, 13, 9, 3, 1, 8, 7, 3, 9,
    12, 15, 22, 18, 15, 18, 17, 19, 18, 16, 13, 9, 3, 1, 8,
  ].join();

  return (
    <div
      style={{
        padding: 30,
        display: "flex",
        flexWrap: "wrap",
        flexShrink: 0,
        gap: "20px",
      }}
    >
      <Chart
        mode="bars"
        data={data}
        color="#34baeb"
        height="200"
        width="400"
        style={{ padding: "10px 10px 0 10px", border: "3px solid black" }}
      ></Chart>
      <Chart
        mode="line"
        data={data}
        color="#34baeb"
        height="200"
        width="400"
        style={{ paddingTop: 10, border: "3px solid black" }}
      ></Chart>
    </div>
  );
}

export default App;
