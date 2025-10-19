import React from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import "./style.css";

const {{ .SCREEN_NAME }}: React.FC = () => {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body is-flex-direction-column is-justify-content-center">
                <div className="text-holder has-text-centered">
                    <p className="title is-1">This is your {{ .SCREEN_NAME }}</p>
                    
                </div>
                <div className="is-flex mb-5 mt-5">
                    <img src={viteLogo} className="logo vite mr-3" alt="Vite logo" />
                    <img src={reactLogo} className="logo react ml-3" alt="React logo" />
                </div>
                <div className="text-holder has-text-centered">
                    <p className="title is-3 mb-1">Vite + React</p>
                    <p>Made with ❤️ using Let Me React</p>
                </div>
            </div>
        </section>
    );
};

export default {{ .SCREEN_NAME }};
