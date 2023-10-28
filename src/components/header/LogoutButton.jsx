import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.
      logout().  // pehle backend me se logout
        then(() => {
          dispatch(logout());   // fir redux me se
        });
  };
  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
