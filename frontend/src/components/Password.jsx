import React, { useState } from "react";

const Password = ({ icon: Icon, eye: Eye, slash: Slash, ...props }) => {
  const [visible, setVisible] = useState(false);
  const handleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div className="relative w-full">
      <Icon size={18} className="absolute inset-y-3 left-3" />
      <input
        type={visible ? "text" : "password"}
        className="pl-10 pr-10 py-3 bg-red-100 w-full rounded-md text-sm"
        {...props}
      />
      {visible ? (
        <Eye
          onClick={handleVisibility}
          size={20}
          className="absolute inset-y-3 right-3 cursor-pointer"
        />
      ) : (
        <Slash
          onClick={handleVisibility}
          size={20}
          className="absolute inset-y-3 right-3 cursor-pointer"
        />
      )}
    </div>
  );
};

export default Password;
