import React, { createContext, useContext, useState } from 'react';

const ProductCodeContext = createContext({});


export const ProductCodeProvider = ({ children }) => {
  const [inputProductCode, setInputProductCode] = useState({
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
  });

  const concatenatedProductCode = Object.values(inputProductCode).every(code => code !== '') ? Object.values(inputProductCode).join('') : '';

  return (
    <ProductCodeContext.Provider
      value={{ inputProductCode, setInputProductCode, concatenatedProductCode }}
    >
      {children}
    </ProductCodeContext.Provider>
  );
};

export const useProductCode = () => useContext(ProductCodeContext);
