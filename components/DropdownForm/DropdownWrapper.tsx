import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Flags from "react-world-flags";
const DropdownWrapper = ({
  value,
  setValue,
  search,
  setSearch,
  filteredOptions,
  errors,
  placeholder,
  type,
}: any) => {
  return (
    <div className="w-full md:w-1/3 flex flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`px-4 py-2 rounded-md shadow-md text-left flex items-center gap-2 ${errors ? "border border-red-500" : "border border-gray-600"
            } bg-black text-white`}
        >
          {value || placeholder}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#1a1a1a] rounded-md shadow-lg p-2 w-full min-w-[300px]">
          <input
            type="text"
            placeholder={`Search ${placeholder}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 mb-2 border border-gray-600 rounded-md bg-black text-white placeholder-gray-500 focus:outline-none"
          />
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option: any) => (
              <DropdownMenuItem
                key={option.id || option.code}
                onClick={() => setValue(option.name)}
                className="hover:bg-gray-700 rounded-md cursor-pointer flex items-center gap-2 text-white"
              >
                {type === "flag" && <Flags code={option.code} style={{ width: 20, height: 15 }} />}
                {option.name}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {errors && <span className="text-red-500 mt-1 text-sm">{errors}</span>}
    </div>
  );
};

export default DropdownWrapper