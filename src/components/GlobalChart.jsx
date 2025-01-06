import React, { useEffect, useState } from "react";
import { Tooltip, Treemap } from "recharts";
import colors from "../styles/settings.module.scss";

const GlobalChart = ({ coinsDataProp }) => {
    //état du tableau de données qu'on va passer à la treeMap, on veut que 45
    const [dataArray, setDataArray] = useState([]);

    //fonction pour gérer la couleur qu'on a importé, sur le fill: plus bas
    const colorPicker = (number) => {
        if (number >= 20) {
            return colors.color1;
        } else if (number >= 5) {
            return colors.green2;
        } else if (number >= 0) {
            return colors.green1;
        } else if (number >= -5) {
            return colors.red1;
        } else if (number >= -20) {
            return colors.red2;
        } else {
            return colors.black2;
        }
    };

    //Exclure certains coins
    const excludeCoin = (coin) => {
        if (coin === "usdt" || coin === "usdc" || coin === "busd" || coin === "dai" || coin === "ust" || coin === "mim") {
            return false;
        } else {
            return true;
        }
    };

    //on met un callback coinsDataProp pour que ça rejoue si les données évoluent
    useEffect(() => {
        //on stocke 45 éléments avec uniquement les infos qu'on veut
        let chartData = [];

        if (coinsDataProp.length > 0) {
            for (let i = 0; i < 45; i++) {
                if (excludeCoin(coinsDataProp[i].symbol)) {
                    chartData.push({
                        name: coinsDataProp[i].symbol.toUpperCase() + " " + coinsDataProp[i].market_cap_change_percentage_24h.toFixed(1) + "%",
                        size: coinsDataProp[i].market_cap,
                        fill: colorPicker(coinsDataProp[i].market_cap_change_percentage_24h),
                    });
                }
            }
        }
        setDataArray(chartData);
    }, [coinsDataProp]);

    const TreemapToolTip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{payload[0].payload.name}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="global-chart">
            <Treemap width={730} height={181} data={dataArray} dataKey="size" stroke="rgb(51,51,51)" fill="black" aspectRatio="1">
                <Tooltip content={<TreemapToolTip />}></Tooltip>
            </Treemap>
        </div>
    );
};

export default GlobalChart;
