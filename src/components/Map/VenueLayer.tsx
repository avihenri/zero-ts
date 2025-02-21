import { Source, Layer } from "react-map-gl";
import { LayerProps } from "react-map-gl";

// TODO: add real data
const venuesGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-3.45, 56.396] },
      properties: {
        name: "Venue 1",
        type: "Bar",
        id: "venue-1",
        marker: "pin",
        activeColour: "#8BFFF5",
        colour: "#15ECE2",
    },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-3.439530, 56.399146] },
      properties: {
        name: "Venue 2",
        type: "Cafe",
        id: "venue-2",
        marker: "pin",
        activeColour: "#8BFFF5",
        colour: "#15ECE2",
    },
    },
  ],
};

const markerLayer = (isInactive = false, highlightedId: string | null = null): LayerProps => ({
  id: "venue-pins",
  source: "venues",
  type: "symbol",
  layout: {
    "icon-size": [
      "case",
      ["==", ["get", "id"], highlightedId],
      1.15,
      1,
    ],
    "icon-image": ["get", "marker"],
    "icon-allow-overlap": true,
    "icon-anchor": "bottom",
  },
  paint: {
    "icon-opacity": [
      "case",
      [
        "any",
        ["==", ["get", "id"], highlightedId],
        ["==", isInactive, false],
      ],
      1,
      0.6,
    ],
    "icon-color": [
      "case",
      ["==", ["get", "id"], highlightedId],
      ["get", "activeColour"],
      [
        "case",
        ["==", isInactive, false],
        ["get", "colour"],
        "#15ECE2",
      ],
    ],
  },
});


const VenueLayer = () => {
  return (
    <Source id="venues" type="geojson" data={venuesGeoJSON}>
      <Layer {...markerLayer()} />
    </Source>
  );
};

export default VenueLayer;
