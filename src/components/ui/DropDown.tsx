import { useState } from "react";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block w-64">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 text-left bg-white border rounded-lg shadow focus:outline-none"
      >
        {value || "Select an option"}
      </button>
      {open && (
        <ul className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
