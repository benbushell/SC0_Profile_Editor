const CSVtable = ({ CSV }) => {
  return (
    <div className="csvTable">
      <tr>
        {Object.keys(CSV[0]).map((key) => (
          <th>{key}</th>
        ))}
      </tr>
      {CSV.map((line) => (
        <tr>
          {Object.values(line).map((val) => (
            <td>{val}</td>
          ))}
        </tr>
      ))}
    </div>
  );
};

export default CSVtable;
