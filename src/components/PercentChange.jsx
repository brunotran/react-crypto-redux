import React, { useEffect, useState } from "react";
import colors from "../styles/settings.module.scss";
// const { green1 } = colors;

const PercentChange = ({ percentprop }) => {
    // console.log(props.percent);
    //état de la couleur
    const [color, setColor] = useState("");

    // quand tu formes ce composant
    useEffect(() => {
        if (percentprop) {
            if (percentprop >= 0) {
                setColor(colors.green1);
            } else {
                setColor(colors.red1);
            }
        } else {
            setColor(colors.white1);
        }
    }, [percentprop]);

    return (
        <p className="percent-change container" style={{ color: color }}>
            {percentprop ? percentprop.toFixed(1) + "%" : "-"}
        </p>
    );
};

export default PercentChange;
