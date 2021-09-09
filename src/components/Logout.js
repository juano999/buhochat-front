import { Button } from "@material-ui/core";
import { useAuth } from "@/contexts/auth";

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <Button onClick={handleLogout}>Cerrar sesión</Button>
    </div>
  );
};

export default Logout;
