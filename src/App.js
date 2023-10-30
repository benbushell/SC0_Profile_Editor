import React from "react";

import "./styles.css";

import Header from "./page/Header";
import Footer from "./page/Footer";
import ImportSC0 from "./page/mainContent/importSc0/importSC0";
import ImportStructures from "./page/mainContent/importStructures";
import EditFiles from "./page/mainContent/editFiles/editFiles";

// Please update

export default function App() {
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [structures, setStructures] = React.useState([]);
  const [selectionMode, setSelectionMode] = React.useState("single");
  const [CSV, setCSV] = React.useState([]);

  return (
    <div className="mainContainer">
      <Header />
      <div className="mid">
        <ImportSC0
          data={data}
          setData={setData}
          selected={selected}
          setSelected={setSelected}
          CSV={CSV}
          setCSV={setCSV}
        />
        <EditFiles data={data} setData={setData} selected={selected} />
      </div>
      <Footer />
    </div>
  );
}
