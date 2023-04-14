import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { Modal } from "react-bootstrap";

export let deleteHandler = (item, deleteFunction) => {

  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="react-confirm-alert-overlay confirmation-modal income_expensesBtn income_expensesBtn deleteCard button:hover deleteCard" style={{ zIndex: 9999 }}>
          <div className="react-confirm-alert">
            <div className="react-confirm-alert-body">
              <h1>Are you sure?</h1>
              <p>{`You want to delete ${item.amount}, ${item.date}, ${item.name}, ${item.category}, id: ${item._id} ?`}</p>
              <Button className="deleteBtn" onClick={onClose} variant="secondary">
                No
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  deleteFunction(item._id);
                  onClose();
                  window.location.reload();
                }}
              >
                Yes, Delete it!
              </Button>
            </div>
          </div>
        </div>
      );
    }
  });
};
