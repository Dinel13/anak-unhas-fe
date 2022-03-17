import React from "react";
import { Link } from "react-router-dom";

export default function AuthButton() {
  return (
    <div className="flex items-center">
      <Link
        to="/masuk"
        className="inline-flex items-center mr-2 p-1.5 link-scale"
      >
        Masuk
      </Link>
      <Link
        to="/daftar"
        className="inline-flex items-center py-1.5 px-4 btn-pri"
      >
        Daftar
      </Link>
    </div>
  );
}
