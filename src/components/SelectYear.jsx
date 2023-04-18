import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function SelectYear({uniqueDates}) {

  let uniqueDatesjsx = uniqueDates.map(item => {
    return (
      <DropdownItem>{item}</DropdownItem>
    )
  })

  return (
    <div>
      <DropdownButton id="dropdown-basic-button" title="Pasirinkti metus">
        {uniqueDatesjsx}
      </DropdownButton>
    </div>
  );
}

export default SelectYear;
