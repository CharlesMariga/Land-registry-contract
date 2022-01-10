export default function Example({ label, placeholder, value, onInputChange }) {
  return (
    <div>
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type="text"
        name="price"
        id="price"
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
}
