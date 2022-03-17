import { Link } from "react-router-dom";

export default function MyAccountButton() {

  return (
    <div className="flex items-end">
      <Link
        to="/akunku"
        className="inline-flex items-center btn-ter text-base px-2.5 py-1.5 md:mt-0"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-4 h-4 mr-1"
          viewBox="0 0 24 24"
        >
          <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Akunku
      </Link>
    </div>
  );
}
