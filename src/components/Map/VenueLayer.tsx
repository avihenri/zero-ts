import { useEffect, useRef, useState } from "react";
import { Popup, useMap } from "react-map-gl";
import type { FeatureCollection, Point } from "geojson";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Venue } from "../../services/venueService";
import { leftPanelStateAtom } from "../../state/atoms/leftPanelStateAtom";
import { selectedVenueDetailsStateAtom } from "../../state/atoms/selectedVenueDetailsStateAtom";
import { PANEL_CONTENT } from "../../state/consts/panels";
import { hoveredVenueStateAtom } from "../../state/atoms/hoveredVenueStateAtom";

const venuesGeoJSON: FeatureCollection<Point, Venue> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-3.40187, 56.42124] },
      properties: {
        id: "10",
        name: "Spar Scone",
        venue_type_tag_id: "1739980068274896",
        venue_type: {
            id: "1739980068274896",
            name: "Shop",
            description: "Facere quia exercitationem ea autem molestias hic maxime temporibus.",
            icon: 'ShoppingBasket',
        },
        location: {
            type: "Point",
            coordinates: [
                -3.4018774,
                56.42124939
            ]
        },
        formatted_address: "Spar, 104 Abbey Road, Scone, PH2 6RU, United Kingdom",
        country_code: "gb",
        timezone: "Europe/London",
        phone: "+441738210210",
        website: "https://scone-arms.perthshireonline.com/en/",
        tags: [
          {
              id: "1739980068352952",
              name: "Gluten free",
              description: "Facilis dolores ea sapiente earum et ut quo repudiandae."
          },
          {
              id: "1739980068233600",
              name: "Lactose free",
              description: "Non recusandae adipisci."
          },
          {
              id: "1739980068918284",
              name: "Vegan",
              description: "Ipsam neque molestias qui at."
          },
          {
              id: "173998006881801",
              name: "Beer",
              description: "Aut illo quo qui id aut iusto et voluptatem."
          },
          {
              id: "1739980068632537",
              name: "Mocktail",
              description: "Culpa aliquam illo nemo officia cum sint quae."
          },
          {
              id: "1739980068842273",
              name: "Corona Zero",
              description: null
          },
          {
              id: "1739980068935629",
              name: "Guiness Zero",
              description: null
          }
        ]
      }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-3.40484, 56.41519] },
      properties: {
        id: "11",
        name: "Scone Arms",
        venue_type_tag_id: "1739980068383227",
        venue_type: {
            id: "1739980068383227",
            name: "Bar",
            description: "Maiores voluptas quia animi aperiam enim aut molestiae rerum.",
            icon: "Bar",
        },
        location: {
            type: "Point",
            coordinates: [
                -3.4048450494010045,
                56.41519355
            ]
        },
        formatted_address: "Scone Arms, 2 Cross Street, Perth, PH2 6LR, United Kingdom",
        housenumber: "2",
        street: "Cross Street",
        city: "Perth",
        country: "United Kingdom",
        state: "Scotland",
        country_code: "gb",
        timezone: "Europe/London",
        phone: "+441738551154",
        website: "https://www.spar.co.uk/store-locator/lan47441-spar-scone",
        tags: [
          {
              id: "1739980068352952",
              name: "Gluten free",
              description: "Facilis dolores ea sapiente earum et ut quo repudiandae."
          },
          {
              id: "1739980068918284",
              name: "Vegan",
              description: "Ipsam neque molestias qui at."
          },
          {
              id: "173998006881801",
              name: "Beer",
              description: "Aut illo quo qui id aut iusto et voluptatem."
          },
          {
              id: "1739980068632537",
              name: "Mocktail",
              description: "Culpa aliquam illo nemo officia cum sint quae."
          },
          {
              id: "1739980068842273",
              name: "Corona Zero",
              description: null
          },
          {
              id: "1739980068935629",
              name: "Guiness Zero",
              description: null
          }
        ]
      }
    },
  ],
};

function parseIfString<T>(value: string | T): T  {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.warn("Failed to parse:", value, error);
      return {} as T;
    }
  }
  return value;
}

const iconsToLoad = [
  { name: "ShoppingBasket", path: "/assets/dark-mode/icons/ShoppingBasket.png" },
  { name: "ShoppingBasket-active", path: "/assets/dark-mode/icons/ShoppingBasket-active.png" },
  { name: "Bar", path: "/assets/dark-mode/icons/Bar.png" },
  { name: "Bar-active", path: "/assets/dark-mode/icons/Bar-active.png" },
];  

const VenueLayer = () => {
  const map = useMap().current?.getMap();
  const imagesAddedRef = useRef<Set<string>>(new Set());

  const [popupInfo, setPopupInfo] = useState<Venue | null>(null);
  const [selectedVenueId, setSelectedVenueId] = useState<string | number | null>("");
  const hoveredVenue = useRecoilValue(hoveredVenueStateAtom);

  const setLeftPanel = useSetRecoilState(leftPanelStateAtom);
  const [selectedVenueDetails, setSelectedVenueDetails] = useRecoilState(selectedVenueDetailsStateAtom);

  const viewVenueDetails = ({ venue }: {venue: Venue}) => {
    const parsedVenue: Venue = {
      ...venue,
      venue_type: parseIfString(venue.venue_type),
      location: parseIfString(venue.location),
      tags: parseIfString(venue.tags),
    };
    if (parsedVenue?.id) {
      setSelectedVenueId(parsedVenue.id);
    }
    setSelectedVenueDetails(parsedVenue);
    setLeftPanel({
        currentPanel: PANEL_CONTENT.VIEW_VENUE,
        previousPanel: null,
    });
  };

  const setPopup = (venue: Venue | null) => {
    if (venue) {
      if (typeof venue.location === "string") {
        try {
          venue.location = JSON.parse(venue.location);
        } catch (error) {
          console.error("Failed to parse location JSON:", venue.location, error);
          return null;
        }
      }
      setPopupInfo(venue);
    } else {
      setPopupInfo(null);
    }
  };

  useEffect(() => {
    if (!map) return;

    const onStyleLoad = () => {
      let loaded = 0;
      const total = iconsToLoad.length;

      iconsToLoad.forEach(({ name, path }) => {
        if (!imagesAddedRef.current.has(name)) {
          if (!map.hasImage(name)) {
            map.loadImage(path, (error, image) => {
              if (!error && image && !map.hasImage(name)) {
                map.addImage(name, image);
                imagesAddedRef.current.add(name);
                loaded++;
                if (loaded === total) addVenueLayer();
              }
            });
          } else {
            imagesAddedRef.current.add(name);
            loaded++;
            if (loaded === total) addVenueLayer();
          }
        }
      });      
    };

    if (!map.isStyleLoaded()) {
      map.once("style.load", onStyleLoad);
    } else {
      onStyleLoad();
    }

    function addVenueLayer() {
      if (!map) return;

      if (!map.getSource("venues")) {
        // add venues source
        map.addSource("venues", {
          type: "geojson",
          data: venuesGeoJSON,
        });
      }

      if (!map.getLayer("venue-symbols")) {
        // add venues layer symbols
        map.addLayer({
          id: "venue-symbols",
          type: "symbol",
          source: "venues",
          layout: {
            "icon-image": [
              "case",
              ["==", ["get", "id"], selectedVenueId],
              ["concat", ["get", "icon", ["get", "venue_type"]], "-active"],
              ["get", "icon", ["get", "venue_type"]],
            ],
            "icon-size": [
              "case",
              ["==", ["get", "id"], selectedVenueId], 0.18,
              0.14,
            ],
            "icon-allow-overlap": true,
            "icon-anchor": "center",
          },
        });
      }

      // set popup on mouseenter
      map.on("mouseenter", "venue-symbols", (e) => {
        map.getCanvas().style.cursor = "pointer";
        const feature = e.features?.[0];
        if (!feature) return;
        setPopup(feature.properties as Venue);
      });

      map.on("mouseleave", "venue-symbols", () => {
        map.getCanvas().style.cursor = "";
      });

      // set popup on click
      map.on("click", "venue-symbols", (e) => {
        const feature = e.features?.[0];
        if (!feature) return;
        setPopup(feature.properties as Venue);
      });

      // remove popup on click outside the layer
      map.on("click", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["venue-symbols"],
        });

        if (!features.length) {
          setPopup(null);
        }
      });
    }

    return () => {
      if (map.getLayer("venue-symbols")) map.removeLayer("venue-symbols");
      if (map.getSource("venues")) map.removeSource("venues");
    
      iconsToLoad.forEach(({ name }) => {
        if (map.hasImage(name)) {
          map.removeImage(name);
          imagesAddedRef.current.delete(name);
        }
      });
    };
    
  }, [map, selectedVenueId, setLeftPanel, setSelectedVenueDetails]);

  useEffect(() => {
    if (!selectedVenueDetails) {
      setSelectedVenueId(null);
    }
  }, [selectedVenueDetails]);

  useEffect(() => {
    if (hoveredVenue) {
      const feature = venuesGeoJSON.features.find((venue) => venue.properties.id === hoveredVenue.id);
      if (feature) {
        setPopup(feature.properties as Venue);
      } else {
        setPopup(null);
      }
    }
  }, [hoveredVenue]);

  return (
    <>
      {popupInfo?.location?.coordinates?.length === 2 && (
        <Popup
          longitude={popupInfo.location.coordinates[0]}
          latitude={popupInfo.location.coordinates[1]}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
          offset={16}
          anchor="bottom"
          className="custom-popup"
        >
          <div className="py-2 px-4 bg-grey-950 text-grey-50 text-center rounded-md shadow-[0_0_8px_rgba(139,255,245,0.5)] border border-primary-200 text-sm">
            <strong className="block uppercase">{popupInfo.name}</strong>
            <button 
              type="button"
              className="mt-4 mb-2 w-full text-sm bg-grey-950 text-secondary-400 font-semibold border border-secondary-400 px-2 py-1 rounded-md shadow-[0_0_8px_rgba(255,111,238,0.4)] hover:shadow-[0_0_10px_rgba(255,111,238,0.6)] hover:text-white focus:outline-none focus:ring-0"
              onClick={() => viewVenueDetails({ venue: popupInfo })}
            >
              View
            </button>
          </div>
        </Popup>
      )}
    </>
  );
};

export default VenueLayer;
