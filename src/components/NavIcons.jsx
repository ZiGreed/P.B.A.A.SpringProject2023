import userLogo from "./../assets/images/user.svg";
import logo from "./../assets/images/logo.svg";
import logout from "./../assets/images/logout.svg";

export function NavLogoutButton() {
  return (
    <>
      <img src={logout} alt="Logout Button" />
    </>
  );
}

export function NavUserLogo() {
  return (
    <>
      <img src={userLogo} alt="User Logo" />
    </>
  );
}

export function NavigationLogo() {
  return (
    <div>
      <img src={logo} alt="Logo"></img>
    </div>
  );
}
