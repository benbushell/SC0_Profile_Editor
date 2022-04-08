const ApplyResults = ({
  data,
  setData,
  CSV,
  setCSV,
  selected,
  setSelected
}) => {
  const handleClick = () => {
    matchChainage();
  };

  const matchChainage = () => {
    console.log(CSV);
    console.log(data);

    const newData = [...data];
    let changedFiles = [];

    for (let line of CSV) {
      for (let file of data) {
        if (parseFloat(line.DIST) === parseFloat(file.header.DIST)) {
          console.log(line.NAME);

          let newHeader = { ...file.header };
          let newFile = { ...file };
          for (let i in Object.keys(line)) {
            newHeader[Object.keys(line)[i]] = Object.values(line)[i];
          }

          newFile.header = newHeader;
          let j = newData.findIndex((d) => d.uid === newFile.uid);

          newData.splice(j, 1, newFile);

          changedFiles.push(newFile.uid);
        }
      }
    }
    setSelected(changedFiles);
    setData(newData);
  };

  return (
    <div className="inputButton" onClick={handleClick}>
      Apply Results
    </div>
  );
};
export default ApplyResults;
