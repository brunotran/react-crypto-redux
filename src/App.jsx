import React, { useEffect, useState } from "react";
import HeaderInfos from "./components/HeaderInfos";
import GlobalChart from "./components/GlobalChart";
import axios from "axios";
import Table from "./components/Table";
import ToTop from "./components/ToTop";

const App = () => {
    //état des données du graphique de gauche et du tableau
    const [coinsData, setCoinsData] = useState([]);

    //quand le composant est monté, on fetch les données et on écoute le scroll pour afficher le bouton ToTop
    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y"
            )
            .then((res) => setCoinsData(res.data));

        window.addEventListener("scroll", () => {
            if (window.scrollY > 145) {
                document.querySelector(".table-header").classList.add("active");
            } else {
                document.querySelector(".table-header").classList.remove("active");
            }
        });
    }, []);

    return (
        <div className="app-container">
            <header>
                <HeaderInfos />
                <GlobalChart coinsDataProp={coinsData} />
            </header>
            <Table coinDataProp={coinsData} />
            <ToTop />
        </div>
    );
};

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
