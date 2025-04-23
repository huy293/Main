import React from "react";

const GroupBT = ({ children, className = "" }) => {
  return (
    <div className={`inline-flex rounded-md shadow-xs ${className}`}>
      {children}
    </div>
  );
}

export default GroupBT;