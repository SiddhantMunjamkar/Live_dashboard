import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

const values = [
  { itemName: "Profile", icon: ArchiveBoxXMarkIcon, href: "#" },
  { itemName: "Settings", icon: Square2StackIcon, href: "#" },
  { itemName: "Logout", icon: TrashIcon, href: "#" },
];

export function ProfileIcon() {
  return (
    <div className="relative">
      <Menu>
        <MenuButton className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer text-white text-sm font-bold hover:bg-gray-600">
          SM
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="z-50 mt-2 w-48 origin-top-right rounded-xl border border-white/10 bg-black/70 backdrop-blur-md p-1.5 text-sm text-white shadow-xl transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          {values.map((item) => (
            <MenuItem key={item.itemName}>
              <a
                href={item.href}
                className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-white/10 data-focus:bg-white/10"
              >
                <item.icon className="w-4 h-4 text-white/70" />
                {item.itemName}
              </a>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
