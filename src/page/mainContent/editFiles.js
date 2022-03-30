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

  const exportFiles = () => {};

  return (
    <div className="editFiles">
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
      <div className="editOptions">
        <div onClick={saveChanges}>Save</div>
        <div>Export</div>
      </div>
    </div>
  );
};

export default EditFiles;
