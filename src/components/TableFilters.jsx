import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setStableState } from "../action/stable.action";
import { setListDisplay } from "../action/list.action";

const TableFilters = () => {
    //état du boolean, j'ai cliqué sur avec Stable Coin ou non
    const [showStable, setShowStable] = useState(true);

    //état pour montrer la liste des favoris ou non
    const [showFavlist, setShowFavlist] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setStableState(showStable));
        dispatch(setListDisplay(showFavlist));
    }, [showStable, showFavlist]);

    return (
        <div className="table-filters">
            <div className="table-filters-container">
                <div className="stable-checkbox-container">
                    <input type="checkbox" name="" id="stableCoin" defaultChecked={true} onChange={() => setShowStable(!showStable)} />
                    <label htmlFor="stableCoin">{showStable ? "Avec stable coin" : "Sans stable coin"}</label>
                </div>
                <div className={showFavlist ? "no-list-btn" : "no-list-btn active"} onClick={() => setShowFavlist(false)}>
                    <p>Aucune liste</p>
                </div>
                <div className={showFavlist ? "fav-list active" : "fav-list"} onClick={() => setShowFavlist(true)}>
                    <p>Liste des favoris</p>
                    <img src="./assets/star-full.svg" alt="icon star" />
                </div>
            </div>
        </div>
    );
};

export default TableFilters;
