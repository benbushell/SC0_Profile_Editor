import Papa from "papaparse";

import CSVtable from "./CSVtable";
import ApplyResults from "./ApplyResults";
import React from "react";
import Results from "./Results";

const ImportCSV = ({ CSV, setCSV, data, setData, selected, setSelected }) => {

  const [results, setResults] = React.useState()

  const parseCSV = (file) => {
    var csvData = [];
    Papa.parse(file, {
      header: true,
      step: function (result) {
        csvData.push(result.data);
      },
      complete: function (results, file) {
        console.log(csvData);
        setCSV(csvData);
      }
    });
  };

  const handleChange = (e) => {
    parseCSV(e.target.files[0]);
  };

  return (
    <div className="importCSV">
      <div className="csvButtons">
        <label className="inputButton">
          <input
            type="file"
            className="custom-file-input"
            onChange={handleChange}
          />
          Import CSV
        </label>
        {CSV.length > 0 ? (
          <ApplyResults
            data={data}
            setData={setData}
            selected={selected}
            setSelected={setSelected}
            CSV={CSV}
            setCSV={setCSV}
          />
        ) : (
          <div></div>
        )}

      </div>
      <div>{results?<Results results={results} setResults={setResults}/>:null}</div>
      <div>{CSV.length > 0 ? <CSVtable CSV={CSV} /> : null}</div>
    </div>
  );
};

export default ImportCSV;
