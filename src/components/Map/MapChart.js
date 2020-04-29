import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

  // let geoUrl = showIndia ? "https://www.covid19india.org/maps/india.json" :
  // "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ setTooltipContent, handleCountryChange, countries, stateswisedata, errorWhileFetching  }) => {
  const [showIndia, setShowIndia] = useState("");
  
  let geoUrl = showIndia ? "https://www.covid19india.org/maps/india.json" :
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  function getData(countrycode, statename) {
    if(countrycode){
    const data = countries.filter((country) => country.code === countrycode);
    return data[0];
    }
    if(statename){
    const data = stateswisedata.filter(state => state.state === statename)
    return data[0];
    }
  }

   const handleButtonClick = () => {
    setShowIndia(false);
  }

  return (
    <>
      {showIndia ? 
        <button style={{height: '30px', width: '60px', borderRadius: '5px'}} 
          onClick={handleButtonClick} type="button">Back
        </button> : null
      }
      <ComposableMap data-tip="" projectionConfig={showIndia ? {rotate: [-80.0, -23.0, 0], scale: 800 } : {scale: 200}}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    if(geo.properties.ISO_A2 === 'IN'){
                      setShowIndia(true);
                    }
                  }}
                  onMouseEnter={() => {
                    const { ISO_A2, st_nm } = geo.properties;
                    handleCountryChange(ISO_A2, st_nm);
                    setTooltipContent(getData(ISO_A2, st_nm));
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "rgb(19, 21, 22)",
                      outline: "none",
                      stroke: "rgb(107, 109, 112)",
                      strokeOpacity: "1"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
