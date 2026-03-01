import { getAuth ,connectAuthEmulator} from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
}