import { useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationPin from "../../assets/icons8-location-pin-30.png";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const exampleVenuesGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-3.45, 56.396] },
      properties: {
        name: "Venue 1",
        type: "Bar",
        id: "venue-1",
    },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-3.439530, 56.399146] },
      properties: {
        name: "Venue 2",
        type: "Cafe",
        id: "venue-2",
    },
    },
  ],
};

const MapComponent = () => {
  // TODO: add localization
  const [viewState, setViewState] = useState({
    longitude: -3.439,
    latitude: 56.396,
    zoom: 13,
  });

  return (
    <div className="w-full h-full">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={true}
      >
        <Marker longitude={-3.439} latitude={56.396}>
          <div className="bg-action-500 w-3 h-3 rounded-full border-2 border-white"></div>
        </Marker>

        {exampleVenuesGeoJSON.features.length > 0 && exampleVenuesGeoJSON.features.map((venue) => (
          <Marker
            key={venue.properties.id}
            longitude={venue.geometry.coordinates[0]}
            latitude={venue.geometry.coordinates[1]}
            anchor="bottom"
          >
            <img src={LocationPin} alt="location pin" />
          </Marker>
        ))}

        <NavigationControl position='bottom-right' />
      </Map>
    </div>
  );
};

export default MapComponent;
