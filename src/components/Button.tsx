import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed`}
  >
    {children}
  </button>
);
