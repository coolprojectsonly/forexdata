import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./action";

function App() {
  const { data, status, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [headers, setHeaders] = useState([]);
  const [columnData, setColumData] = useState([]);
  const [timeSeries, setTimeSeries] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const numRows = timeSeries?.length;
  const numCols = 7;
  const rowsPerPage = 10;

  const handleClick = () => {
    const newData = [...columnData];

    const hedData = [...headers];

    [hedData[0], hedData[1], hedData[2], hedData[3], hedData[4]] = [
      hedData[1],
      hedData[4],
      hedData[3],
      hedData[2],
      hedData[0],
    ];

    setHeaders(hedData);

    [newData[0], newData[1], newData[2], newData[3], newData[4]] = [
      newData[1],
      newData[4],
      newData[3],
      newData[2],
      newData[0],
    ];

    setColumData(newData);
  };

  const totalPages = Math.ceil(numRows / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const timeSeries = data["Time Series (5min)"];

      if (timeSeries && typeof timeSeries === "object") {
        const timeKeys = Object.keys(timeSeries);
        const valueOnjects = Object.values(timeSeries);

        if (valueOnjects && typeof valueOnjects === "object") {
          const val = Object.values(valueOnjects);

          // val[0]

          const getHeaders = Object.keys(val[0]);
          const getData = val.map((item) => Object.values(item));

          const headings = getHeaders.map((item) => ({
            Headers: item.replace(/[0-9\s.]/g, ""),
            accessor: item.replace(/[0-9\s.]/g, ""),
          }));

          setHeaders(headings);

          // console.log(timeKeys);
          setTimeSeries(timeKeys);

          setColumData(getData);
        }

        // console.log(valueOnjects.map((item) => item["1. open"]));
      }
    }
  }, [data]);

  console.log(headers);

  const handlePage = (newpage) => {
    setCurrentPage(newpage);
  };

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <h1>Something Went Wrong:{error}</h1>;
  }

  return (
    <>
      <h1>
        Real Time Forex,ETF,{" "}
        <span style={{ color: "blue" }}>Technocal Indicators</span> Data From
        API
      </h1>
      <div
        style={{ width: "100vw", display: "flex", justifyContent: "center",  }}
      >
        <button onClick={handleClick}>Randomize Columns</button>
      </div>

      <div className="tableContainer">
        <table className="tableOne">
          <thead>
            {" "}
            <th>No</th>
            <th>Time Series</th>{" "}
          </thead>
          <tbody>
            {timeSeries.map((item, timeIndex) => (
              <tr
                key={timeIndex}
                style={{
                  display:
                    timeIndex < endIndex && timeIndex >= startIndex
                      ? "table-row"
                      : "none",
                }}
              >
                <td>{timeIndex + 1}</td>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="tableTwo">
          <thead>
            <tr>
              {headers.map((item, index) => (
                <th key={index}> {item.Headers}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {columnData.map((item, colIndex) => (
              <tr
                key={colIndex}
                style={{
                  display:
                    colIndex >= startIndex && colIndex < endIndex
                      ? "table-row"
                      : "none",
                }}
              >
                {headers.map((itemData, headerIndex) => (
                  <td key={headerIndex}>{item[headerIndex]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="buttonContainer">
        <button
          onClick={() => handlePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button onClick={() => handlePage(1)} className="middleButton">
          1
        </button>
        <button onClick={() => handlePage(2)} className="middleButton">
          2
        </button>
        <button
          onClick={() => handlePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
