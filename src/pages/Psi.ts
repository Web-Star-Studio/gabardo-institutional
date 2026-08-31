import { useEffect } from "react";

export default function Psi() {

  useEffect(() => {
    window.location.href = "/PSI.pdf";
  }, []);

  return null;
}