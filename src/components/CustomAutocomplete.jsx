import { Combobox } from "@headlessui/react";
import PropTypes from "prop-types";

const CustomAutocomplete = ({
  label,
  options = [],
  value,
  onChange,
  error,
  placeholder = "Select an option",
}) => {
  const selectedOption = options.find((opt) => opt.id === value) || null;
  const displayValue = selectedOption?.name || "";

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <Combobox.Input
            className={`w-full border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            displayValue={() => displayValue}
            placeholder={placeholder}
          />
          <Combobox.Options className="absolute z-10 w-full bg-white border mt-1 rounded-md shadow-md max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-4 py-2 text-gray-400">No options</div>
            ) : (
              options.map((opt) => (
                <Combobox.Option
                  key={opt.id}
                  value={opt.id}
                  className={({ active }) =>
                    `px-4 py-2 cursor-pointer ${
                      active ? "bg-blue-100" : "bg-white"
                    }`
                  }
                >
                  {opt.name}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

CustomAutocomplete.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

export default CustomAutocomplete;
