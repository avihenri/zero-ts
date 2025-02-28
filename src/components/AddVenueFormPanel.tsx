import { useRef } from "react";

const AddVenueFormPanel = () => {
    const panelRef = useRef<HTMLDivElement | null>(null);

    return (
        <div
            ref={panelRef}
            className="h-[90%]"
            data-testid="venue-details-panel"
        >
            <div className="h-full overflow-auto pr-4">
                
            </div>
        </div>
    );
  };
  
  export default AddVenueFormPanel;
  