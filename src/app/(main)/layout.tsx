import React, { ReactNode } from "react";

const MainLayout = ({ children }:{children:ReactNode}) => {
  return <div className="container mx-auto my-32">{children}</div>;
};

export default MainLayout;
