import React from "react";

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative w-full">
      <Icon size={18} className="absolute inset-y-3 left-3" />
      <input
        className="pl-10 pr-4 py-3 bg-red-100 w-full rounded-md text-sm"
        {...props}
      />
    </div>
  );
};

export default Input;
