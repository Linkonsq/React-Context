import { useAuth } from "./auth-context";
import { AuthenticatedRoutes, UnAuthenticatedRoutes } from "./routes";

export default function App() {
  const { loggedIn } = useAuth();
  // console.log(loggedIn);
  return loggedIn ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />;
}
