import { Button } from "@material-ui/core";
import { useAuth } from "@/contexts/auth";
import api from "src/api";

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    try {
      const res = api.delete("/deleteFalse")
    } catch (e) {
      console.log("error logout", e)
    }
  };

  return (
    <div>
      <Button onClick={handleLogout}>Cerrar sesión</Button>
    </div>
  );
};

export default Logout;
