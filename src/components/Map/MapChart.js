import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ setTooltipContent, handleCountryChange, countries, errorWhileFetching }) => {

  function getData(countrycode) {
    const data = countries.filter((country) => country.code === countrycode);
    return data[0];
  }

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => console.log(geo.properties.ISO_A2)}
                  onMouseEnter={() => {
                    const { ISO_A2 } = geo.properties;
                    handleCountryChange(ISO_A2);
                    setTooltipContent(getData(ISO_A2));
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
