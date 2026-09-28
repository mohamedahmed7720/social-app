import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

export default function AuthProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useContext(AuthContext)!;

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return <>{children}</>;
}
