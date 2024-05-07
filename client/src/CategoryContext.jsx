// import React, { createContext, useState, useEffect } from 'react';

// const CategoryContext = createContext();

// export const CategoryProvider = ({ children }) => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   async function fetchCategories() {

//       const response = await fetch('http://localhost:8080/categories');
//       const data = await response.json();
//       setCategories(data);

//   }

//   return (
//     <CategoryContext.Provider value={categories}>
//       {children}
//     </CategoryContext.Provider>
//   );
// };

// export default CategoryContext;
