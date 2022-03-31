import FileSaver, { saveAs } from "file-saver";
import JSZip from "jszip";

const EditFiles = ({ data, setData, selected }) => {
  const edited = {};

  const combineFiles = () => {
    let newHeader = {};

    for (let file of data) {
      if (selected.includes(file.uid)) {
        for (let i in Object.keys(file.header)) {
          let key = Object.keys(file.header)[i];
          let val = Object.values(file.header)[i];

          if (newHeader[key] === val) {
            continue
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
  };

  const exportFiles = () => {

    let zip = new JSZip();
    let edited = zip.folder("edited");

    for(let file of data){
      if(selected.includes(file.uid)){
        let newRaw = [...file.raw]
        //find length of headers
        let headerLength = 0
        for (let line of newRaw) {
          if (
            line[0].substring(0, 1) !== "+" &&
            line[0].substring(0, 1) !== "-"
          ) {
            headerLength++
          } else {
            break;
          }
        }

        //remove headers
        newRaw.splice(0,headerLength)
        //console.log(newRaw)

        //add new headers
        let headerArr = []
        for(let i in Object.keys(file.header)){
          headerArr.push([Object.keys(file.header)[i]+'='+Object.values(file.header)[i]])
        }

        newRaw = [...headerArr,...newRaw]

        for(let line of newRaw){
          line[0]+="\n"
        }

        //get filename
        let fileName = String(parseFloat(file.header.DIST)*1000)+'BK'+'.sc0'


        //setup zip export

        var blob = new Blob(newRaw, { type: "text/plain;charset=utf-8" });

        edited.file(fileName, blob);

        

      }
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
      // Force down of the Zip file
      saveAs(content, "archive.zip");})
  };

  return (
    <div className="editFiles">
      <div>
      {selected.length === 0? <div>Import and select some files to edit!</div>:null}
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
      <div className="editOptions">
        <div onClick={saveChanges}>Save</div>
        <div onClick={exportFiles}>Export</div>
      </div>
    </div>
  );
};

export default EditFiles;
