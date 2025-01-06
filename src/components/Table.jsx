import React, { useState } from "react";
import TableLine from "./TableLine";
import ToTop from "./ToTop";
import { useSelector } from "react-redux";
import { isStableCoin } from "./Utils";

const Table = ({ coinDataProp }) => {
    //on récupère la valeur du reduce showStable ici
    const showStable = useSelector((state) => state.stableReducer.showStable);

    //on récupère la valeur du reduce showList ici
    const showFavList = useSelector((state) => state.listReducer.showList);

    //état du nb de coins (nb lignes du tableau)
    const [rangeNumber, setRangeNumber] = useState(100);

    //état du Tri
    const [orderBy, setOrderBy] = useState("");

    //les en-têtes du header qu'on va mapper
    const tableHeader = ["Prix", "MarketCap", "Volume", "1h", "1j", "1s", "1m", "6m", "1a", "ATH"];

    return (
        <div className="table-container">
            <ul className="table-header">
                <div className="range-container">
                    <span>
                        Top <input type="text" name="" id="" value={rangeNumber} onChange={(e) => setRangeNumber(e.target.value)} />
                    </span>
                    <input type="range" name="" id="" min="1" max="250" value={rangeNumber} onChange={(e) => setRangeNumber(e.target.value)} />
                    <ToTop />
                </div>
                {tableHeader.map((el) => (
                    <li key={el}>
                        <input
                            type="radio"
                            name="header-el"
                            id={el}
                            defaultChecked={el === orderBy || el === orderBy + "reverse" ? true : false}
                            onClick={() => {
                                if (orderBy === el) {
                                    setOrderBy(el + "reverse");
                                } else {
                                    setOrderBy(el);
                                }
                            }}
                        />
                        <label htmlFor={el}>{el}</label>
                    </li>
                ))}
            </ul>
            {coinDataProp &&
                coinDataProp
                    .slice(0, rangeNumber)
                    .filter((coin) => {
                        //si on récupére la valeur du store (state.stableReducer.showStable) et que c'est vrai, on retourne sinon on filtre
                        if (showStable) {
                            return coin;
                        } else {
                            //Utils.js
                            if (isStableCoin(coin.symbol)) {
                                return coin;
                            }
                        }
                    })
                    //on récupère la valeur du store state.listReducer.showList
                    .filter((coin) => {
                        if (showFavList) {
                            let list = window.localStorage.coinList.split(",");
                            //console.log(list);
                            if (list.includes(coin.id)) {
                                return coin;
                            }
                        } else {
                            return coin;
                        }
                    })
                    //.sort((a, b) => b.current_price - a.current_price)
                    .sort((a, b) => {
                        switch (orderBy) {
                            case "Prix":
                                return b.current_price - a.current_price;
                            case "Volume":
                                return b.total_volume - a.total_volume;
                            case "MarketCap":
                                return b.market_cap - a.market_cap;
                            case "1h":
                                return b.price_change_percentage_1h_in_currency - a.price_change_percentage_1h_in_currency;
                            case "1j":
                                return b.price_change_percentage_24h - a.price_change_percentage_24h;
                            case "1s":
                                return b.price_change_percentage_7d_in_currency - a.price_change_percentage_7d_in_currency;
                            case "1m":
                                return b.price_change_percentage_30d_in_currency - a.price_change_percentage_30d_in_currency;
                            case "6m":
                                return b.price_change_percentage_200d_in_currency - a.price_change_percentage_200d_in_currency;
                            case "1a":
                                return b.price_change_percentage_1y_in_currency - a.price_change_percentage_1y_in_currency;
                            case "ATH":
                                return b.ath_change_percentage - a.ath_change_percentage;
                            case "Prixreverse":
                                return a.current_price - b.current_price;
                            case "Volumereverse":
                                return a.total_volume - b.total_volume;
                            case "MarketCapreverse":
                                return a.market_cap - b.market_cap;
                            case "1hreverse":
                                return a.price_change_percentage_1h_in_currency - b.price_change_percentage_1h_in_currency;
                            case "1jreverse":
                                return a.price_change_percentage_24h - b.price_change_percentage_24h;
                            case "1sreverse":
                                return a.price_change_percentage_7d_in_currency - b.price_change_percentage_7d_in_currency;
                            case "1m":
                                return b.price_change_percentage_30d_in_currency - a.price_change_percentage_30d_in_currency;
                            case "6mreverse":
                                return a.price_change_percentage_200d_in_currency - b.price_change_percentage_200d_in_currency;
                            case "1areverse":
                                return a.price_change_percentage_1y_in_currency - b.price_change_percentage_1y_in_currency;
                            case "ATHreverse":
                                return a.ath_change_percentage - b.ath_change_percentage;
                            default:
                                null;
                        }
                    })
                    .map((coin, index) => <TableLine coinprop={coin} indexprop={index} key={index} />)}
        </div>
    );
};

export default Table;
