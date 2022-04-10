const RemoveRails = ({
  removeRails,
  setRemoveRails,
  railParams,
  setRailParams,
}) => {
  const handleClick = () => {
    setRemoveRails(!removeRails);
  };

const handleChange2 = (e, axis, i) => {
    let newVal = e.target.value;
    let newState = { ...railParams };
    newState[axis].splice(i, 1, newVal);
    setRailParams(newState);
  }

  return (
    <div>
      <div className="file">
        <div className="fileName" onClick={() => handleClick()}>
          Remove Rails
        </div>
        <div className="fileOptions">
          <div
            className={removeRails ? "ticked" : "unticked"}
            onClick={() => handleClick()}
          ></div>
        </div>
      </div>
      {removeRails ? (
        <div>
          <div className="railParams">
            x :
            <input
              type="text"
              onChange={(e) => handleChange2(e, "x",0)}
              value={railParams.x[0]}
            />
            <input
              type="text"
              onChange={(e) => handleChange2(e, "x",1)}
              value={railParams.x[1]}
            />
          </div>
          <div className="railParams">
            y :
            <input
              type="text"
              onChange={(e) => handleChange2(e, "y",0)}
              value={railParams.y[0]}
            />
            <input
              type="text"
              onChange={(e) => handleChange2(e, "y",1)}
              value={railParams.y[1]}
            />
          </div>
        </div>
      ) : null}

    </div>
  );
};

export default RemoveRails;
