import { useEffect, useState } from "react";

// Data
import mockData from "../assets/data.json";

import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [newMockData,setNewMockData]=useState([])
  
// const newMockData=[]
  const handleOrderSelection = (row) => {
    setSelectedOrderDetails(newMockData[row].executionDetails);
    // console.log(row.timestamps);
    setSelectedOrderTimeStamps(newMockData[row].timestamps);
    // console.log(newMockData[row]);
  };

   
  useEffect(() => {
    setNewMockData(mockData.results.map((row) => {
      let newRow = timestamps.results.find(
        (newRow) => newRow["&id"] === row["&id"]
      );
      return { ...row, ...newRow };
    }))
  }, []);

  
  const filteredRows = newMockData.filter((row) =>
  row["&id"].toLowerCase().includes(searchText.toLowerCase())
);

  // const orderLength=mockData.results.length
  // console.log(currency);
// console.log(filteredRows);
  // console.log(newMockData);
  // console.log(searchText);
  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={mockData.results.length}
        />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List
          rows={filteredRows}
          currency={currency}
          selectedOrder={handleOrderSelection}
          searchText={searchText}
        />
      </div>
    </div>
  );
};

export default Dashboard;
