import React, { useContext } from 'react';
import { OverlayContext } from './OverlayContext';

const FilterBtnMobile = () => {
  
    const { setFilterSidebar, filterSidebar } = useContext(OverlayContext)
    
  return (
    <button
      className="md:hidden fixed bottom-4 right-4 z-20 bg-black text-white p-3 rounded-full shadow-lg active:scale-90"
      onClick={() => setFilterSidebar(!filterSidebar)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    </button>
  );
}

export default FilterBtnMobile;