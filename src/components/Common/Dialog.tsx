import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface DialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function Dialog({ isOpen, onClose, title, description, children }: DialogProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50" />
        <DialogPrimitive.Content
          className="fixed inset-0 flex items-center justify-center z-50"
          data-testid="dialog"
        >
          <div className="bg-grey-950 border border-grey-500 p-6 rounded-lg shadow-lg w-96 relative">
            <DialogPrimitive.Close
              className="absolute top-1 right-1 p-1 rounded-full text-grey-400 hover:bg-grey-700"
              data-testid="dialog-close"
            >
              <IoMdCloseCircleOutline className="text-2xl" />
            </DialogPrimitive.Close>

            {title ? (
              <DialogPrimitive.Title
                className="text-lg text-primary-200 font-bold"
                data-testid="dialog-title"
              >{title}</DialogPrimitive.Title>
            ) : (
              <VisuallyHidden>
                <DialogPrimitive.Title>Dialog</DialogPrimitive.Title>
              </VisuallyHidden>
            )}

            {description && (
              <DialogPrimitive.Description
                className="text-grey-500 mb-4"
                data-testid="dialog-description"
              >
                {description}
              </DialogPrimitive.Description>
            )}

            <div className="space-y-4 mt-4">{children}</div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
