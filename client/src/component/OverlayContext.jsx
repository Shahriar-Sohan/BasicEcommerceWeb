import React, { createContext, useState } from 'react';


export const OverlayContext = createContext(null);

export function OverlayProvider({ children }){

    const [filterSidebar, setFilterSidebar] = useState(false)
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [product, setProduct] = useState({});


  return (
    <OverlayContext.Provider value={{ setIsOverlayVisible, isOverlayVisible, setProduct, product, setFilterSidebar, filterSidebar }}>
      {children}
    </OverlayContext.Provider>
  );
};
