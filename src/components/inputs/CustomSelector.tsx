import React from "react";

type Props = {
  lable: string;
  error?: string;
  items: string[];
} & React.SelectHTMLAttributes<HTMLElement>;

const CustomSelector = ({ lable, error, items, ...rest }: Props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {lable}
      </label>
      <select
        {...rest}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select Category</option>
        {items?.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <p className="mt-1 text-sm text-red-600">{error}</p>
    </div>
  );
};
export default CustomSelector;
