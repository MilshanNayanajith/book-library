import React from 'react'

type Props = {
    lable:string,
    error?: string,


} & React.InputHTMLAttributes<HTMLElement>;

const CustomInput = ({lable, error, ...rest}: Props) => {
  return (
    <div className="mb-4">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
      {lable}
    </label>
    <input
      {...rest}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter your email"
    />
    <p className="mt-1 text-sm text-red-600">{error}</p>
  </div>
  
  )
}
export default CustomInput