import React from "react";
import ReactDOM from "react-dom";
import Papa from "papaparse";

function ImportStructures({ structures, setStructures }) {
  const handleInput = (e) => {
    let file = e.target.files[0];

    var csvData = [];
    Papa.parse(file, {
      header: false,
      skipEmptyLines: "greedy",
      step: function (result) {
        csvData.push({
          name: result.data[0],
          chainage: parseFloat(result.data[1]) / 1000
        });
      },
      complete: function (results, file) {
        console.log("Complete", csvData.length, "records.");
        setStructures(csvData);
      }
    });
  };

  return (
    <div className="importStructures">
      <div>Chainage input</div>
      <input type="file" onChange={handleInput} />
      <div>
        {structures.map((structure) => (
          <div key={structure.name} className="file">
            <div className="fileName">{structure.name}</div>
            <div className="fileOptions">
              <div className="deleteFile">X</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ImportStructures;
