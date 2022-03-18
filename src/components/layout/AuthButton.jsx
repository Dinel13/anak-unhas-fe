import React from "react";
import { Link } from "react-router-dom";

export default function AuthButton() {
  return (
    <div className="flex items-center text-sm">
      <Link
        to="/masuk"
        className="mr-1.5 p-1.5 link-scale"
      >
        Masuk
      </Link>
      <Link
        to="/daftar"
        className="py-1.5 px-3 btn-pri"
      >
        Daftar
      </Link>
    </div>
  );
}
