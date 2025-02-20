// TODO: Implement the VenueListItem component with data
const VenueListItem = () => {
    return (
        <div
            className="w-full min-h-28 p-2 my-2 rounded-md flex flex-col justify-between bg-grey-900"
            data-testid="venue-list-item"
        >
            <div className="w-full" data-testid="venue-list-header">
                <div
                    className="text-primary-400 text-lg font-semibold uppercase px-2"
                    data-testid="venue-list-name"
                >
                    Tesco Express
                </div>
                <div className="text-primary-50 font-semibold w-full uppercase px-2" data-testid="venue-list-category">
                    Shop
                </div>
            </div>
            <div className="flex justify-end" data-testid="venue-list-buttons">
                <button
                    type="button"
                    className="p-2 text-grey-950 font-semibold text-sm rounded-md bg-primary-400 hover:bg-primary-500"
                    data-testid="venue-list-button-view"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}

export default VenueListItem;