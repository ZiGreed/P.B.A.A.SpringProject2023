import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/api";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import UserEditForm from "./UserEditForm";
import UserDeleteConfirmation from "./UserDeleteConfirmation";
import UserCreationForm from "./UserCreationForm";

function Users() {
  const [users, setUsers] = useState([]);
  const usersURL = "http://localhost:3000/users";
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isBeingDeleted, setIsBeingDeleted] = useState(false);
  const [beingCreated, setBeingCreated] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getAllUsers(usersURL);
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  let usersJSX = users.map((user) => {
    return (
      <option value={user._id} key={user._id}>
        {user.email}
      </option>
    );
  });

  function handleSelect(e) {
    const userId = e.target.value;
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
    setIsBeingDeleted(false);
    setIsEditing(false);
    setBeingCreated(false);
  }

  return (
    <div className="admin-panel">
      {!isEditing && !isBeingDeleted && (
        <div>
          <button
            type="button"
            onClick={() => {
              setBeingCreated(true);
              setIsBeingDeleted(false);
              setIsEditing(false);
            }}
            className="gradient-class"
            style={{ width: "100%" }}
          >
            Sukurti vartotoją
          </button>
        </div>
      )}

      <select
        onChange={(e) => handleSelect(e)}
        defaultValue=""
        className="gradient-class"
        style={{ cursor: "pointer", width: "35%" }}
      >
        <option value="">Pasirinkti vartotoją</option>
        {usersJSX}
      </select>
      <div className="admin-buttons">
        <RiEdit2Line
          size={50}
          className="buttonIcons"
          onClick={() => {
            setIsEditing(true);
            setIsBeingDeleted(false);
            setBeingCreated(false);
          }}
        />
        <RiDeleteBinLine
          size={50}
          className="buttonIcons"
          onClick={() => {
            setIsBeingDeleted(true);
            setIsEditing(false);
            setBeingCreated(false);
          }}
        />
      </div>
      <div>
        {isEditing && (
          <UserEditForm
            setIsEditing={setIsEditing}
            selectedUser={selectedUser}
          />
        )}
        {isBeingDeleted && (
          <UserDeleteConfirmation
            setIsBeingDeleted={setIsBeingDeleted}
            selectedUser={selectedUser}
          />
        )}
        {beingCreated && <UserCreationForm setBeingCreated={setBeingCreated}/>}
      </div>
    </div>
  );
}

export default Users;
