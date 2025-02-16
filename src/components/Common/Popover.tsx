import * as PopoverPrimitive from "@radix-ui/react-popover";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export function Popover({
  trigger,
  content,
  side = "right",
  align = "center",
  sideOffset = 8,
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="bg-grey-950 border border-grey-200 shadow-lg p-4 rounded-lg text-xs text-grey-400 w-[21rem] z-[60]"
          side={side}
          align={align}
          sideOffset={sideOffset}
          data-testid="popover-content"
        >
          {content}
          <PopoverPrimitive.Close
            className="absolute top-1 right-1 p-1 rounded-full text-grey-400 hover:bg-grey-700"
            data-testid="popover-close"
          >
            <IoMdCloseCircleOutline className="text-2xl" />
          </PopoverPrimitive.Close>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
