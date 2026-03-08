import React, { FunctionComponent } from 'react';

export const Toggle: FunctionComponent = () => {
  return (
    <label className="relative cursor-pointer">
      <div className="inline-block pb-2">
        <input className="mr-1 sr-only peer" type="checkbox" />

        <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full translate-all duration-300"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform duration-300"></div>
      </div>
    </label>
  );
};
