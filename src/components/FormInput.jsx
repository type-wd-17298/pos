import PropTypes from "prop-types";

const FormInput = ({ label, id, placeholder, field, error }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-600 mb-2 block"
      >
        {label}
      </label>
      <input
        {...field}
        id={id}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  field: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export default FormInput;
