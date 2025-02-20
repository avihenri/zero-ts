import { useRef, useState } from "react";
import Map, { MapRef, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "../../assets/map-marker.svg";
import VenueLayer from "./VenueLayer";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const mapRef = useRef<MapRef>(null);
  
  // TODO: add localization
  const [viewState, setViewState] = useState({
    longitude: -3.439,
    latitude: 56.396,
    zoom: 13,
  });

  const onLoad = () => {
    if (!mapRef.current) return;
  
    const map = mapRef.current;
    const image = new Image();
    image.onload = () => map.addImage("pin", image, { sdf: true, pixelRatio: 4 });
    image.src = Pin;
  };

  return (
    <div className="w-full h-full">
      <Map
        ref={mapRef}
        {...viewState}
        onLoad={onLoad}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={true}
      >
        <Marker longitude={-3.439} latitude={56.396}>
          <div className="bg-action-500 w-3 h-3 rounded-full border-2 border-white"></div>
        </Marker>

        <VenueLayer />

        <NavigationControl position='bottom-right' />
      </Map>
    </div>
  );
};

export default MapComponent;
