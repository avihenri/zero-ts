import { useEffect, useRef, useState } from "react";
import Map, { MapRef, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRecoilState } from "recoil";
import { venueCoordinatesStateAtom } from "../../state/atoms/venueCoordinatesStateAtom";
import { CoordinatesType } from "../../ts/types";
import { ENV } from "../../config/env";
import VenueLayer from "./VenueLayer";

const MAPBOX_TOKEN = ENV.MAPBOX_KEY;

// const exampleVenuesGeoJSON = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       geometry: { type: "Point", coordinates: [-3.45, 56.396] },
//       properties: {
//         name: "Venue 1",
//         type: "Bar",
//         id: "venue-1",
//       },
//     },
//     {
//       type: "Feature",
//       geometry: { type: "Point", coordinates: [-3.439530, 56.399146] },
//       properties: {
//         name: "Venue 2",
//         type: "Cafe",
//         id: "venue-2",
//       },
//     },
//   ],
// };

const MapComponent = ({ id, onPinMove }: { id: string; onPinMove?: (coords: CoordinatesType) => void }) => {
  const mapRef = useRef<MapRef>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [venueCoordinates, setVenueCoordinates] = useRecoilState<CoordinatesType>(venueCoordinatesStateAtom);
  const isNewOrUpdatingMap = id === "create-update-venue-map";
  
  // TODO: add localization
  const [viewState, setViewState] = useState({
    longitude: -3.404,
    latitude: 56.415,
    zoom: 13,
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
        if (mapRef.current) {
            mapRef.current.resize();
        }
    });

    if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
    }

    return () => {
        resizeObserver.disconnect();
    };
}, []);

  useEffect(() => {
    if (isNewOrUpdatingMap && venueCoordinates?.lat && venueCoordinates?.lon) {
      setViewState({
        longitude: venueCoordinates.lon,
        latitude: venueCoordinates.lat,
        zoom: 17,
      });
    }
  }, [venueCoordinates, isNewOrUpdatingMap]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Map
          id={id}
          key={id}
          ref={mapRef}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          style={{ width: "100%", height: "100%" }}
          mapboxAccessToken={MAPBOX_TOKEN}
          attributionControl={true}
      >
        {isNewOrUpdatingMap &&
          venueCoordinates?.lat &&
          venueCoordinates?.lon && (
            <Marker
              key="venue-marker"
              longitude={venueCoordinates.lon}
              latitude={venueCoordinates.lat}
              anchor="bottom"
              style={{ cursor: "grab" }}
              draggable
              onDragEnd={(event) => {
                const { lng, lat } = event.lngLat;
                setVenueCoordinates({ lon: lng, lat: lat });
                if (onPinMove) {
                    onPinMove({ lon: lng, lat: lat });
                }
              }}
            />
          )}

        {id === "main-app-map" &&
          <VenueLayer />
        }

        {id === "main-app-map" && (
          <Marker key="user-location-marker" longitude={-3.439} latitude={56.396}>
            <div className="bg-secondary-500 w-3 h-3 rounded-full border-2 border-white"></div>
          </Marker>
        )}

        <NavigationControl position="bottom-right" />
      </Map>
    </div>
  );
};

export default MapComponent;
