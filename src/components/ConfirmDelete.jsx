import { Trash2Icon } from "lucide-react";
import { useState } from "react";

const useDeleteDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState(null);

  const open = (props) => {
    setDialogProps(props);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const DialogComponent = () => {
    if (!isOpen || !dialogProps) return null;

    return (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 opacity-50 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto" key={"id"}>
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-200/50 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2Icon className="text-red-600"/>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold text-gray-900"
                      id="modal-title"
                    >
                      {dialogProps.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {dialogProps.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 flex gap-4">
                {dialogProps.actions}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return { open, close, DialogComponent };
};

export default useDeleteDialog;
