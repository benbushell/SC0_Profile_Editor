import React from "react";

import "./styles.css";

import Header from "./page/Header";
import Footer from "./page/Footer";
import ImportSC0 from "./page/mainContent/importSC0";
import ImportStructures from "./page/mainContent/importStructures";
import EditFiles from "./page/mainContent/editFiles";

export default function App() {
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [structures, setStructures] = React.useState([]);

  return (
    <div className="mainContainer">
      <Header />
      <div className="mid">
        <ImportSC0
          data={data}
          setData={setData}
          selected={selected}
          setSelected={setSelected}
        />
        <ImportStructures
          structures={structures}
          setStructures={setStructures}
        />
        <EditFiles data={data} setData={setData} selected={selected} />
      </div>
      <Footer />
    </div>
  );
}
