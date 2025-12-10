import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

type JwtPayload = {
  id: string;
  iat: number;
  exp: number;
};

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserId(null);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setUserId(decoded.id);
    } catch (err) {
      console.error("Invalid token:", err);
      setUserId(null);
    }
  }, []);

  return { userId };
}
