import { useEffect, useState } from "react";
import { Popup, useMap } from "react-map-gl";
import type { FeatureCollection, Point } from "geojson";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { hoveredVenueStateAtom } from "../../state/atoms/hoveredVenueStateAtom";
import { Venue } from "../../services/venueService";
import { leftPanelStateAtom } from "../../state/atoms/leftPanelStateAtom";
import { selectedVenueDetailsStateAtom } from "../../state/atoms/selectedVenueDetailsStateAtom";
import { PANEL_CONTENT } from "../../state/consts/panels";

const venuesGeoJSON: FeatureCollection<Point, Venue> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-3.40187, 56.42124] },
      properties: {
        id: "10",
        name: "Spar Scone",
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
        housenumber: "104",
        street: "Abbey Road",
        city: "Scone",
        country: "United Kingdom",
        state: "Scotland",
        country_code: "gb",
        timezone: "Europe/London",
        phone: "+441738210210",
        website: "https://scone-arms.perthshireonline.com/en/",
        tags_by_type: {
            dietary_types: [
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
                }
            ],
            zero_drink_types: [
                {
                    id: "173998006881801",
                    name: "Beer",
                    description: "Aut illo quo qui id aut iusto et voluptatem."
                },
                {
                    id: "1739980068632537",
                    name: "Mocktail",
                    description: "Culpa aliquam illo nemo officia cum sint quae."
                }
            ],
            zero_drinks: [
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
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-3.40484, 56.41519] },
      properties: {
        id: "11",
        name: "Scone Arms",
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
        tags_by_type: {
            dietary_types: [
                {
                    id: "1739980068352952",
                    name: "Gluten free",
                    description: "Facilis dolores ea sapiente earum et ut quo repudiandae."
                },
                {
                    id: "1739980068918284",
                    name: "Vegan",
                    description: "Ipsam neque molestias qui at."
                }
            ],
            zero_drink_types: [
                {
                    id: "173998006881801",
                    name: "Beer",
                    description: "Aut illo quo qui id aut iusto et voluptatem."
                },
                {
                    id: "1739980068632537",
                    name: "Mocktail",
                    description: "Culpa aliquam illo nemo officia cum sint quae."
                }
            ],
            zero_drinks: [
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

const VenueLayer = () => {
  const map = useMap().current?.getMap();
  const [popupInfo, setPopupInfo] = useState<Venue | null>(null);

  const hoveredVenue = useRecoilValue(hoveredVenueStateAtom);
  const setLeftPanel = useSetRecoilState(leftPanelStateAtom);
  const setSelectedVenueDetails = useSetRecoilState(selectedVenueDetailsStateAtom);

  useEffect(() => {
    if (!map) return;

    const iconsToLoad = [
      { name: "ShoppingBasket", path: "/assets/dark-mode/icons/ShoppingBasket.png" },
      { name: "Bar", path: "/assets/dark-mode/icons/Bar.png" },
    ];

    const onStyleLoad = () => {
      let loaded = 0;
      const total = iconsToLoad.length;

      iconsToLoad.forEach(({ name, path }) => {
        if (!map.hasImage(name)) {
          map.loadImage(path, (error, image) => {
            if (!error && image) {
              map.addImage(name, image);
              loaded++;
              if (loaded === total) addVenueLayer();
            }
          });
        } else {
          loaded++;
          if (loaded === total) addVenueLayer();
        }
      });
    };

    if (!map.isStyleLoaded()) {
      map.once("style.load", onStyleLoad);
    } else {
      onStyleLoad();
    }

    function addVenueLayer() {
      if (!map?.getSource("venues")) {
        map?.addSource("venues", {
          type: "geojson",
          data: venuesGeoJSON,
        });
      }

      if (!map?.getLayer("venue-symbols")) {
        map?.addLayer({
          id: "venue-symbols",
          type: "symbol",
          source: "venues",
          layout: {
            "icon-image": ["get", "icon", ["get", "venue_type"]],
            "icon-size": 0.16,
            "icon-allow-overlap": true,
            "icon-anchor": "center",
          },
        });
      }

      map?.on("click", "venue-symbols", (e) => {
        const feature = e.features?.[0];
        if (!feature) return;
        const raw = feature.properties as Venue;
        const parsedVenue: Venue = {
          ...raw,
          venue_type: parseIfString(raw.venue_type),
          location: parseIfString(raw.location),
          tags_by_type: parseIfString(raw.tags_by_type),
        };
        setSelectedVenueDetails(parsedVenue);
        setLeftPanel({
            currentPanel: PANEL_CONTENT.VIEW_VENUE,
            previousPanel: null,
        });
      });

      map?.on("mouseenter", "venue-symbols", (e) => {
        map.getCanvas().style.cursor = "pointer";
        const feature = e.features?.[0];
        if (!feature) return;

        setPopupInfo((prev) => {
          const next = feature.properties as Venue;

          if (typeof next.location === "string") {
            try {
              next.location = JSON.parse(next.location);
            } catch (error) {
              console.error("Failed to parse location JSON:", next.location, error);
              return null;
            }
          }
        
          return prev?.id === next.id ? null : next;
        });
        
      });

      map?.on("mouseleave", "venue-symbols", () => {
        map.getCanvas().style.cursor = "";
      });

      map?.on("click", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["venue-symbols"],
        });

        if (!features.length) {
          setPopupInfo(null);
        }
      });
    }

    return () => {
      if (map.getLayer("venue-symbols")) map.removeLayer("venue-symbols");
      if (map.getSource("venues")) map.removeSource("venues");

      iconsToLoad.forEach(({ name }) => {
        if (map.hasImage(name)) map.removeImage(name);
      });
    };
  }, [map, setLeftPanel, setSelectedVenueDetails]);

  useEffect(() => {
    if (!hoveredVenue || !map) {
      setPopupInfo(null);
      return;
    }

    const feature = venuesGeoJSON.features.find(
      (f) => f.properties.id === hoveredVenue.id
    );

    if (feature) {
      setPopupInfo(hoveredVenue);
    }
  }, [hoveredVenue, map]);

  return (
    <>
      {popupInfo?.location?.coordinates?.length === 2 && (
        <Popup
          longitude={popupInfo.location.coordinates[0]}
          latitude={popupInfo.location.coordinates[1]}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
          offset={26}
          anchor="bottom"
          className="custom-popup px-2"
        >
          <div className="p-1 bg-white text-grey-800 text-center rounded shadow-md text-sm">
            <strong className="block text-primary-800">{popupInfo.name}</strong>
          </div>
        </Popup>
      )}
    </>
  );
};

export default VenueLayer;
