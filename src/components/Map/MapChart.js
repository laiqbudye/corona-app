import React, { memo, useState, Fragment } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

import { MAP_META } from '../../constants';
import { Typography } from '@material-ui/core';

const MapChart = ({ setTooltipContent, handleCountryChange, countries, stateswisedata, districtwisedata, errorWhileFetching  }) => {
  const [showIndia, setShowIndia] = useState("");
  const [showStateMapOf, setShowStateMapOf] = useState("");

  let geoUrl = showIndia ? MAP_META.India.geoDataFile
  : showStateMapOf ? MAP_META[showStateMapOf].geoDataFile
  : MAP_META.World.geoDataFile;

  
  function getData(countrycode, statename, districtname) {
    if(countrycode){
    const data = countries.filter((country) => country.code === countrycode);
    return data[0];
    }
    if(statename){
      if(statename === 'JAMMU & KASHMIR'){
        statename = 'Jammu and Kashmir'
      }
      if(districtname){
        let currentState = districtwisedata.filter(state => state.state === statename);
        let data = currentState[0].districtData.filter(district => district.district === districtname);

        if(data.length === 0){   // if distric not found in data, then it must be clean district (no one infected there)
          data = [{
            active: 0,
            confirmed: 0,
            deceased: 0,
            district: districtname,
            recovered: 0
          }]
        }
        return data[0];
      }
    const data = stateswisedata.filter(state => state.state === statename)
    return data[0];
    }
  }

   const handleButtonClick = () => {
     if(showStateMapOf){
      setShowStateMapOf(false);
      setShowIndia(true);
      return;
     }
     setShowIndia(false);
  }

  return (
    <>
      
      {showIndia || showStateMapOf ? 
        <Fragment>
          <button style={{height: '30px', width: '60px', borderRadius: '5px', float:'right'}} 
          onClick={handleButtonClick} type="button">Back
          </button>
        </Fragment>  : null
      }

      {showIndia ? <Typography color='textSecondary' style={{ marginLeft: '20%' }}>
                        please click on any state to study it in detail
                    </Typography> :
                    showStateMapOf ? null : 
                    <Typography color='textSecondary' style={{ marginLeft: '20%' }}>
                        please click on India to study it in detail
                    </Typography>
        }

        <ComposableMap data-tip="" projectionConfig={showIndia ? 
                      {rotate: [-80.0, -23.0, 0], scale: 800 } 
                      : showStateMapOf ? { scale: 3000 } :{scale: 200}}>
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
                    if(geo.properties.st_nm){
                      setShowIndia(false);
                      setShowStateMapOf(geo.properties.st_nm);
                    }
                  }}
                  onMouseEnter={() => {
                    const { ISO_A2, st_nm, district} = geo.properties;
                    handleCountryChange(ISO_A2, st_nm, district);
                    setTooltipContent(getData(ISO_A2, st_nm, district));
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#a7f1a7",//rgb(19, 21, 22)",
                      outline: "none",
                      stroke: "black",//"rgb(107, 109, 112)",
                      strokeOpacity: "1"
                    },
                    hover: {
                      fill: "#189a18",//"#F53",
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
