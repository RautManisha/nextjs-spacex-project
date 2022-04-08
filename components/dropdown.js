export default function Dropdown({ callback, label, list, id }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <select
        id={id}
        defaultValue="default"
        placeholder="Select"
        onChange={(e) => callback(e.target.value)}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none bg-gray-50 focus:ring-fuchsia-100 focus:border-fuchsia-100 sm:text-sm cursor-pointer"
      >
        <option value="default" disabled hidden>
          Select {label}
        </option>
        {list.map((item, i) => {
          return (
            <option key={id + i} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
