import Papa from "papaparse";

import CSVtable from "./CSVtable";

const ImportCSV = ({ CSV, setCSV }) => {
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
      <div>
        <label className="inputButton">
          <input
            type="file"
            className="custom-file-input"
            onChange={handleChange}
          />
          Import CSV
        </label>
      </div>
      <div>{CSV.length > 0 ? <CSVtable CSV={CSV} /> : null}</div>
    </div>
  );
};

export default ImportCSV;
