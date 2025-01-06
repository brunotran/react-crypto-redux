import React, { useEffect, useState } from "react";

const StarIcon = ({ coinIdProp }) => {
    //console.log("coinIdProp : ", coinIdProp);

    //état : est ce que l'image est likée ? si oui, étoile pleine sinon étoile vide
    const [like, setLike] = useState(false);

    //quand le composant est monté
    useEffect(() => {
        //si on a qqchose dans localStorage ?, on casse la chaîne par une virgule, et on crée un tableau.
        //Si le tableau contient l'id likée, on passe like à true
        if (window.localStorage.coinList) {
            let favList = window.localStorage.coinList.split(",");
            if (favList.includes(coinIdProp)) {
                setLike(true);
            } else {
                setLike(false);
            }
        }
    }, [coinIdProp]);

    //vérifier si on a coché ou pas, et mettre dans localStorage
    const idChecker = (id) => {
        let favList = null;
        //est-ce que le localStorage existe ?
        if (window.localStorage.coinList) {
            favList = window.localStorage.coinList.split(",");
        }

        //si tableau
        if (favList) {
            //si tableau contient id, on le retire et on passe à false
            if (favList.includes(id)) {
                window.localStorage.coinList = favList.filter((coin) => coin !== id);
                setLike(false);
            } else {
                window.localStorage.coinList = [...favList, coinIdProp];
                setLike(true);
            }
        } else {
            window.localStorage.coinList = coinIdProp;
            setLike(true);
        }
    };

    return <img src={like ? "./assets/star-full.svg" : "./assets/star-empty.svg"} onClick={() => idChecker(coinIdProp)} />;
};

export default StarIcon;
