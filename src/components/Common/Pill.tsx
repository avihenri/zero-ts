type PillType = {
    text: string;
    onClick?: () => void;
}

const Pill = ({ text, onClick } : PillType ) => (
    <button
        type="button"
        className="p-1 m-1 bg-grey-900 text-primary-400 rounded-md w-fit cursor-default"
        onClick={onClick}
    >
        {text}
    </button>
);

export default Pill;