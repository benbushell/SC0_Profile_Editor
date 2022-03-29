import Papa from "papaparse";
import React from "react";
import ReactDOM from "react-dom";

const ImportSC0 = ({ data, setData, selected, setSelected }) => {
  const parseFiles = (files) => {
    const filesData = [];
    Promise.all(
      [...files].map(
        (file) =>
          new Promise((resolve, reject) =>
            Papa.parse(file, {
              header: false,
              complete: resolve, // Resolve each promise
              error: reject
            })
          )
      )
    )
      .then((results) => {
        results.forEach((result, index) => {
          filesData.push(result.data);
        });
        formatData(filesData); // now since .then() excutes after all promises are resolved, filesData contains all the parsed files.
      })
      .catch((err) => console.log("Something went wrong:", err));
  };

  const formatData = (parsed) => {
    let final = [];

    for (let file of parsed) {
      let currHeader = {};

      for (let line of file) {
        if (
          line[0].substring(0, 1) !== "+" &&
          line[0].substring(0, 1) !== "-"
        ) {
          let text = line[0];

          let splitArr = text.split("=");

          currHeader[splitArr[0]] = splitArr[1];
        } else {
          break;
        }
      }

      final.push({
        uid: Math.floor(Date.now() * Math.random()),
        header: currHeader,
        raw: file
      });
    }

    setData([...data, ...final]);
  };

  const handleChange = (e) => {
    let files = e.target.files;
    console.log(files);

    parseFiles(files);
  };

  const selectFile = (id) => {
    if (selected.includes(id)) {
      let newArr = selected.filter((currid) => currid !== id);
      setSelected(newArr);
    } else {
      setSelected([...selected, id]);
    }
  };

  const removeFile = (id) => {
    if (selected.includes(id)) {
      let newArr = selected.filter((currid) => currid !== id);
      setSelected(newArr);
    }

    var index = data.findIndex((p) => p.uid === id);
    console.log(index);

    let newArr = [...data];
    newArr.splice(index, 1);

    setData(newArr);
  };

  return (
    <div className="importSc0">
      <div>
        <div>Import SC0 Files</div>

        <input
          type="file"
          className="custom-file-input"
          multiple
          onChange={handleChange}
        />
        <div>
          {data.map((file) => (
            <div key={file.uid} className="file">
              <div className="fileName" onClick={() => selectFile(file.uid)}>
                {file.header.DIST}
              </div>
              <div className="fileOptions">
                <div
                  className={
                    selected.includes(file.uid) ? "ticked" : "unticked"
                  }
                  onClick={() => selectFile(file.uid)}
                ></div>
                <div
                  className="deleteFile"
                  onClick={() => removeFile(file.uid)}
                >
                  X
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImportSC0;
