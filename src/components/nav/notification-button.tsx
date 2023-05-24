import { BellIcon } from "@heroicons/react/20/solid";

export default function NotificationButton() {
  return (
    <>
      <button
        type="button"
        className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white"
      >
        <BellIcon className="w-6 h-6" />
        <div className="absolute inline-flex items-center justify-center w-2 h-2 bg-red-500 rounded-full top-1 right-1"></div>
      </button>
    </>
  );
}
