import { useRef } from "react";

const AddVenueFormPanel = () => {
    const panelRef = useRef<HTMLDivElement | null>(null);

    return (
        <div
            ref={panelRef}
            className="h-full"
            data-testid="venue-details-panel"
        >
            <div className="h-[85%] overflow-auto pr-4">
                
            </div>
        </div>
    );
  };
  
  export default AddVenueFormPanel;
  