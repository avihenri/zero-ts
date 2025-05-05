import { Venue } from "../../services/venueService";
import { Tag } from "../../ts/types";
import Divider from "../Common/Divider";
import Pill from "../Common/Pill";

const VenueTagsDisplay = ({ venueDetails }: { venueDetails: Venue }) => {
  if (!venueDetails || !venueDetails.tags?.length) return null;

  const allTypesInOrder = [
    "dietary_type",
    "dietary_option",
    "zero_drink_type",
    "zero_drink_option",
    "feature",
  ];

  const displayNames: Record<string, string> = {
    dietary_type: "Dietaries",
    dietary_option: "Dietary Options",
    zero_drink_type: "Non-Alcoholic Drinks",
    zero_drink_option: "Non-Alcoholic Drink Options",
    feature: "Features",
  };

  const groupedTags = venueDetails.tags.reduce<Record<string, Tag[]>>((acc, tag) => {
    if (!tag.type) return acc;
    const typeName = tag.type.name;
    if (!acc[typeName]) acc[typeName] = [];
    acc[typeName].push(tag);
    return acc;
  }, {});

  return (
    <div
      className="w-full px-2"
      data-testid="venue-tags-display"
    >
      {allTypesInOrder.map((type, index) => {
        const tags = groupedTags[type] || [];
        const isLast = index === allTypesInOrder.length - 1;
        return (
          <div key={type}>
            <h1 className="text-primary-400 my-2 font-semibold">
              {displayNames[type] || type}
            </h1>
            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Pill key={tag.id} text={tag.name} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">Nothing reported</p>
            )}
            {!isLast && <Divider classNames="my-4" />}
          </div>
        );
      })}
    </div>
  );
};

export default VenueTagsDisplay;
