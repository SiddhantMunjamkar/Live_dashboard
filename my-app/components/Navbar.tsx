import { ClockComponentNavbar } from "./clock_component_navbar";
import { LiveDataCard } from "./livedatacard";
import { Navbar_path_show } from "./Navbar_path_show";
import { ProfileIcon } from "./profile_icon";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#0b1220] shadow-md">
      <div className="h-14 px-6 flex items-center justify-between">
        {/* LEFT */}
        <Navbar_path_show />

        {/* RIGHT */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <LiveDataCard />
          <ClockComponentNavbar />
          <ProfileIcon />
        </div>
      </div>
    </header>
  );
}
