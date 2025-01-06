import React, { useState } from "react";
import PercentChange from "./PercentChange";
import StarIcon from "./StarIcon";
import CoinChart from "./CoinChart";

const TableLine = ({ coinprop, indexprop }) => {
    //état si on affiche un graphique au survol

    const [showChart, setShowChart] = useState(false);

    //formater le prix avec chiffres après la virgule
    const priceFormater = (num) => {
        //on prend un nombre, on l'arrondit à l'entier le +proche, on le transforme en string pour connaitre sa taille (parce qu'un Number on ne sait pas), on formate le tout en NOMBRE FORMATé avec 7 chiffres après la virgule
        if (Math.round(num).toString.length < 4) {
            return new Intl.NumberFormat("us-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 7,
            }).format(num);
        } else {
            return num;
        }
    };

    //formater le nombre de market en millions de dollard : on convertit en Chaine, on splitte en tableau, on retire les 6 derniers chiffres du tableau, on recolle en string, on remet en Number()
    const mktCapFormater = (num) => {
        let newNum = String(num).split("");
        newNum = newNum.slice(0, -6);
        return Number(newNum.join(""));
    };

    return (
        <div className="table-line">
            <div className="infos-container">
                {/* on lui passe l'id du coin récupéré plus haut :) */}
                <StarIcon coinIdProp={coinprop.id} />
                <p>{indexprop + 1}</p>
                <div className="img">
                    <img src={coinprop.image} height="20" alt="logo" />
                </div>
                <div className="infos">
                    <div
                        className="chart-img"
                        onMouseEnter={() => setShowChart(true)}
                        onMouseLeave={() => {
                            setShowChart(false);
                        }}
                    >
                        <img src="./assets/chart-icon.svg" alt="chart-icon" />
                        <div className="chart-container" id={coinprop.name}>
                            {showChart && <CoinChart coinIdProp={coinprop.id} coinNameProp={coinprop.name} />}
                        </div>
                    </div>
                    <h4>{coinprop.name}</h4>
                    <span>- {coinprop.symbol.toUpperCase()}</span>
                    <a target="_blank" href={"https://www.coingecko.com/fr/pi%C3%A8ces/" + coinprop.id.toLowerCase()}>
                        <img src="./assets/info-icon.svg" alt="info icon" />
                    </a>
                </div>
            </div>
            <p>{priceFormater(coinprop.current_price).toLocaleString()} $</p>
            <p className="mktcap">{mktCapFormater(coinprop.market_cap).toLocaleString()} M$</p>
            <p className="volume">{coinprop.total_volume.toLocaleString()} $</p>
            <PercentChange percentprop={coinprop.price_change_percentage_1h_in_currency} />
            <PercentChange percentprop={coinprop.price_change_percentage_24h} />
            <PercentChange percentprop={coinprop.price_change_percentage_7d_in_currency} />
            <PercentChange percentprop={coinprop.price_change_percentage_30d_in_currency} />
            <PercentChange percentprop={coinprop.price_change_percentage_200d_in_currency} />
            <PercentChange percentprop={coinprop.price_change_percentage_1y_in_currency} />
            {coinprop.ath_change_percentage > -3 ? <p>ATH</p> : <PercentChange percentprop={coinprop.ath_change_percentage} />}
        </div>
    );
};

export default TableLine;
