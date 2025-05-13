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
      <button onClick={() => setOpen(!open)} className="w-full rounded-lg border bg-white px-4 py-2 text-left shadow focus:outline-none">
        {value || "Select an option"}
      </button>
      {open && (
        <ul className="absolute mt-2 w-full rounded-lg border bg-white shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
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
