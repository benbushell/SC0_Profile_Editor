import FileSaver, { saveAs } from "file-saver";
import JSZip, { file } from "jszip";

import React from "react";

import RemoveRails from "./RemoveRails";

const EditFiles = ({ data, setData, selected }) => {
  const edited = {};

  const [removeRails, setRemoveRails] = React.useState(false);
  const [railParams, setRailParams] = React.useState({
    x: [-1.5, 1.5],
    y: [-1, 0.2],
  });

  const combineFiles = () => {
    let newHeader = {};

    for (let file of data) {
      if (selected.includes(file.uid)) {
        for (let i in Object.keys(file.header)) {
          let key = Object.keys(file.header)[i];
          let val = Object.values(file.header)[i];

          if (newHeader[key] === val) {
            continue;
          } else if (newHeader[key] === undefined) {
            newHeader[key] = val;
          } else {
            newHeader[key] = "*Varies*";
          }
        }
      }
    }

    return newHeader;
  };

  const editedParams = (event, key) => {
    edited[key] = event.target.value;
  };

  const saveChanges = () => {
    let newData = [...data];
    for (let file of newData) {
      if (selected.includes(file.uid)) {
        let newHeader = { ...file.header };
        let newFile = { ...file };
        for (let i in Object.keys(edited)) {
          newHeader[Object.keys(edited)[i]] = Object.values(edited)[i];
        }
        newFile.header = newHeader;
        console.log(newFile);
        let j = newData.findIndex((d) => d.uid === newFile.uid);

        newData.splice(j, 1, newFile);

        setData(newData);
      }
    }

    if (removeRails) {
      editOffsets();
    }
  };

  const editOffsets = () => {
    for (let file of data) {
      if (selected.includes(file.uid)) {
        let newRaw = file.raw;
        
        for (let i = newRaw.length; i>0; i--) {
          let valArr = newRaw[i][0].split(" ");

          if (parseInt(valArr[2]) !== 6 && parseInt(valArr[2]) !== 7) {
            if (
              parseFloat(valArr[0]) > parseFloat(railParams.x[0]) &&
              parseFloat(valArr[0]) < parseFloat(railParams.x[1]) &&
              parseFloat(valArr[1]) > parseFloat(railParams.y[0]) &&
              parseFloat(valArr[1]) < parseFloat(railParams.y[1])
            ) {
              newRaw.splice(i,1)
              console.log(newRaw);

            }
          }
          
        }
      }
    }
  };

  const exportFiles = () => {
    let zip = new JSZip();
    let edited = zip.folder("edited");

    for (let file of data) {
      if (selected.includes(file.uid)) {
        let newRaw = [...file.raw];
        //find length of headers
        let headerLength = 0;
        for (let line of newRaw) {
          if (
            line[0].substring(0, 1) !== "+" &&
            line[0].substring(0, 1) !== "-"
          ) {
            headerLength++;
          } else {
            break;
          }
        }

        //remove headers
        newRaw.splice(0, headerLength);
        //console.log(newRaw)

        //add new headers
        let headerArr = [];
        for (let i in Object.keys(file.header)) {
          headerArr.push([
            Object.keys(file.header)[i] + "=" + Object.values(file.header)[i],
          ]);
        }

        newRaw = [...headerArr, ...newRaw];

        for (let line of newRaw) {
          line[0] += "\n";
        }

        //get filename
        let fileName =
          String(parseFloat(file.header.DIST) * 1000) + "BK" + ".sc0";

        //setup zip export

        var blob = new Blob(newRaw, { type: "text/plain;charset=utf-8" });

        edited.file(fileName, blob);
      }
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
      // Force down of the Zip file
      saveAs(content, "archive.zip");
    });
  };

  return (
    <div className="editFiles">
      <div>
        {selected.length === 0 ? (
          <div>Import and select some files to edit!</div>
        ) : null}
        {Object.keys(combineFiles()).map((key, i) => (
          <div className="parameterDisplay">
            <div>{key} : </div>
            <input
              type="text"
              placeholder={Object.values(combineFiles())[i]}
              onChange={(event) => {
                editedParams(event, key);
              }}
            />
          </div>
        ))}
      </div>
      <div>
        <div>
          <div>
            <RemoveRails
              removeRails={removeRails}
              setRemoveRails={setRemoveRails}
              railParams={railParams}
              setRailParams={setRailParams}
            />
          </div>
        </div>
        <div className="editOptions">
          <div onClick={saveChanges}>Save</div>
          <div onClick={exportFiles}>Export</div>
        </div>
      </div>
    </div>
  );
};

export default EditFiles;
