import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import styles from "./Map.module.css";
import MapChart from "./MapChart";

const Map = ({ handleCountryChange, countries, stateswisedata, errorWhileFetching }) => {
  const [content, setContent] = useState("");
  return (
    <div className={styles.mapcontainer}>
      <MapChart
        countries={countries}
        stateswisedata={stateswisedata}
        handleCountryChange={handleCountryChange}
        setTooltipContent={setContent}
        errorWhileFetching={errorWhileFetching}
      />
      <ReactTooltip>
        {content && (content.title || content.state) && (
          <div className={styles.tooltipcontainer}>
            <div className={styles.image}>
              <img
                src={`https://www.countryflags.io/${content.code ? content.code : 'IN'}/flat/64.png`}
                alt={content.code}
              />
              <h2>{content.title ? content.title : content.state}</h2>
            </div>
            <span>
            <i style={{color: "rgba(0,0,255,0.5)", width: '25px'}} className="fas fa-clinic-medical"></i>
              <strong>Total Cases: </strong>
              {new Intl.NumberFormat('en-IN').format(content?.total_cases ? content.total_cases : content.confirmed)}
            </span>
            <span>
              <i style={{color: "rgba(0,255,0,0.5)", width: '25px'}} className="fas fa-hospital-user"></i>
              <strong>Total Recovered: </strong>
              {new Intl.NumberFormat('en-IN').format(content?.total_recovered ? content.total_recovered : content.recovered)}
            </span>
            <span>
              <i style={{color: "rgba(255,0,0.5)", width: '25px'}} className="fas fa-skull-crossbones"></i>
              <strong>Total Deaths: </strong>
              {new Intl.NumberFormat('en-IN').format(content?.total_deaths ? content.total_deaths : content.deaths)}
            </span>
            <span>
              <i style={{color: "rgba(239,255,0,0.5)", width: '25px'}} className="fas fa-procedures"></i>
              <strong>Total Active: </strong>
              {new Intl.NumberFormat('en-IN').format(content?.total_active_cases ? content.total_active_cases : content.active)}
            </span>
          </div>
        )}
      </ReactTooltip>
    </div>
  );
}

export default Map;