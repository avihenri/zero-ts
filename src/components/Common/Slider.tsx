import * as SliderRadix from "@radix-ui/react-slider";

interface SliderProps {
    value: number;
    onValueChange: (value: number) => void;
}

const Slider = ({ value, onValueChange } : SliderProps) => {
    return (
        <SliderRadix.Root
            className="relative flex w-full h-5 items-center select-none touch-none my-2"
            value={[value]}
            onValueChange={(newValue) => onValueChange(newValue[0])}
            max={100}
            step={10}
        >
        <SliderRadix.Track className="relative flex-grow h-[3px] bg-primary-50 rounded-full">
            <SliderRadix.Range className="absolute h-full bg-primary-600 rounded-full" />
        </SliderRadix.Track>
        <SliderRadix.Thumb
            className="block w-5 h-5 bg-primary-600 rounded-full shadow-md transition-all hover:bg-primary-400 focus:outline-none"
            aria-label="Volume"
        />
        </SliderRadix.Root>
    );
};

export default Slider;
