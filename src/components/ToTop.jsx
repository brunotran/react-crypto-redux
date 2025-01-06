import React from "react";

const ToTop = () => {
    return (
        //window.scrollTo(0,0) pour remonter tout en haut
        <div className="top" onClick={() => window.scrollTo(0, 0)}>
            <img src="./assets/arrow-icon.svg" alt="arrow" />
        </div>
    );
};

export default ToTop;
