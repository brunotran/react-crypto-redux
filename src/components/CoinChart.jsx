import axios from "axios";
import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import colors from "../styles/settings.module.scss";

console.log(colors.color1, colors.white1);

const CoinChart = ({ coinIdProp, coinNameProp }) => {
    //état pour stocker la durée dans une variable
    const [duration, setDuration] = useState(30);

    //état des données propres du coin pour le graphique
    const [coinData, setCoinData] = useState();

    const headerData = [
        [1, "1 jour"],
        [3, "3 jours"],
        [7, "7 jours"],
        [30, "1 mois"],
        [91, "3 mois"],
        [181, "6 mois"],
        [365, "1 an"],
        [3000, "Max"],
    ];

    useEffect(() => {
        //tableaux de données qu'on va préparer pour le graphique
        let dataArray = [];

        axios
            .get(`https://api.coingecko.com/api/v3/coins/${coinIdProp}/market_chart?vs_currency=usd&days=${duration}${duration > 32 ? "&interval=daily" : ""}`)
            .then((res) => {
                for (let i = 0; i < res.data.prices.length; i++) {
                    //on récupère le prix du flux
                    let price = res.data.prices[i][1];
                    dataArray.push({
                        date: new Date(res.data.prices[i][0]).toLocaleDateString(),
                        price: price < "50" ? price : parseInt(price),
                    });
                }
                //on vient de convertir le flux dans un autre tableau avec les valeurs qu'on veut
                //console.log(dataArray);
                setCoinData(dataArray);
            });
    }, [coinIdProp, duration]);

    return (
        <div className="coin-chart">
            <p>{coinNameProp}</p>
            <div className="btn-container">
                {headerData.map((el) => {
                    return (
                        <div key={el[0]} htmlFor={"btn" + el[0]} onClick={() => setDuration(el[0])} className={el[0] === duration ? "active-btn" : ""}>
                            {el[1]}
                        </div>
                    );
                })}
            </div>
            <AreaChart width={680} height={250} data={coinData} margin={{ top: 10, right: 0, left: 100, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="7%" stopColor={colors.color1} stopOpacity={0.8} />
                        <stop offset="93%" stopColor={colors.white1} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis domain={["auto", "auto"]} />
                <CartesianGrid strokeDasharray="3, 3" />
                <Tooltip />
                <Area type="monotone" dataKey="price" stroke={colors.color1} fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </div>
    );
};

export default CoinChart;
