import { useEffect, useRef, useState } from "react";
import Map, { MapRef, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRecoilState } from "recoil";
import { venueCoordinatesStateAtom } from "../../state/atoms/venueCoordinatesStateAtom";
import { CoordinatesType } from "../../ts/types";
import { ENV } from "../../config/env";

const MAPBOX_TOKEN = ENV.MAPBOX_KEY;

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

const MapComponent = ({ id } : { id: string}) => {
  const mapRef = useRef<MapRef>(null);

  const [venueCoordinates, setVenueCoordinates] = useRecoilState<CoordinatesType>(venueCoordinatesStateAtom);
  const isNewOrUpdatingMap = id === "create-update-venue-map";
  
  // TODO: add localization
  const [viewState, setViewState] = useState({
    longitude: -3.439,
    latitude: 56.396,
    zoom: 13,
  });

  // const onLoad = () => {
  //   if (!mapRef.current) return;
  
  //   const map = mapRef.current;
  //   const image = new Image();
  //   image.onload = () => map.addImage("pin", image, { sdf: true });
  //   image.src = Pin;
  // };

  useEffect(() => {
    console.log(venueCoordinates);
    if (venueCoordinates?.lat && venueCoordinates?.lon) {
      setViewState({
        longitude: venueCoordinates.lon,
        latitude: venueCoordinates.lat,
        zoom: 17,
      });
    }
  }, [venueCoordinates]);

  return (
    <div className="w-full h-full">
      <Map
          id={id}
          key={id}
          ref={mapRef}
          {...viewState}
          // onLoad={onLoad}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          style={{ width: "100%", height: "100%" }}
          mapboxAccessToken={MAPBOX_TOKEN}
          attributionControl={true}
      >
        {/* store or edit venue pin */}
        {isNewOrUpdatingMap && 
          (venueCoordinates?.lat && venueCoordinates?.lon)
          && (
          <Marker
            key="venue-marker"
            longitude={venueCoordinates.lon}
            latitude={venueCoordinates.lat}
            anchor="bottom"
            style={{ cursor: "grab" }}
            draggable
            onDragEnd={(event) => {
              const { lng, lat } = event.lngLat;
              setViewState((prev) => ({
                ...prev,
                longitude: lng,
                latitude: lat,
              }));
              setVenueCoordinates({
                  lon: lng,
                  lat: lat,
              });
            }}
          />
        )}

        {/* TODO: implement venue layer instead of marker */}
        {/* <VenueLayer /> */}
        {id === 'main-app-map' && exampleVenuesGeoJSON.features.length > 0 && exampleVenuesGeoJSON.features.map((venue) => (
            <Marker
              key={venue.properties.id}
              longitude={venue.geometry.coordinates[0]}
              latitude={venue.geometry.coordinates[1]}
              anchor="bottom"
              style={{ cursor: "pointer" }}
            />
        ))}

        {id === 'main-app-map' && (
          <Marker
            key="user-location-marker"
            longitude={-3.439}
            latitude={56.396}
          >
            <div className="bg-secondary-500 w-3 h-3 rounded-full border-2 border-white"></div>
          </Marker>
        )}

        <NavigationControl position='bottom-right' />
      </Map>
    </div>
  );
};

export default MapComponent;
