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
          width: "40%",
          height: "20%",
        },
      }}
    >
      <div className="flex flex-col items-center justify-between h-full">
        <p className="text-lg bold">Are you sure you want to delete?</p>
        <div className="flex justify-between w-2/3">
          <button
            type="submit"
            onClick={() => setOpen(false)}
            className="rounded-md border border-transparent bg-red-500 hover:bg-red-400 py-2 px-4"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-md border border-transparent bg-blue-500 hover:bg-blue-400 py-2 px-4"
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
