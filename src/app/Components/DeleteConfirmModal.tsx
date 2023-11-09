import { FC, SetStateAction } from "react";
import ReactModal from "react-modal";

type DeleteModalProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  isLoading: boolean;
  isError: boolean;
};

const DeleteModal: FC<DeleteModalProps> = ({
  open,
  setOpen,
  onConfirm,
  isLoading,
  isError,
}) => {
  return (
    <ReactModal
      isOpen={open}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "50",
        },
        content: {
          position: "relative",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          outline: "none",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          background: "#f2f2f2",
          top: "auto",
          left: "auto",
          right: "auto",
          bottom: "auto",
          width: "450px",
          height: "200px",
        },
      }}
    >
      <div className="flex flex-col items-center justify-between h-full">
        <p className="text-xl font-bold text-gray-800 mb-8">
          Are you sure you want to delete?
        </p>
        <div className="flex justify-between w-full max-w-xs">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-6 py-2 text-base font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-4"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-6 py-2 text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
          >
            Confirm
          </button>
        </div>

        {isLoading && <p>Please wait...</p>}
        {isError && (
          <div className="flex justify-center items-center">
            <p className="text-red-500">
              There was an error deleting. Please try again...
            </p>
          </div>
        )}
      </div>
    </ReactModal>
  );
};

export default DeleteModal;
