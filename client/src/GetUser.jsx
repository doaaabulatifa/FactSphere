// import React, { useState, useEffect } from "react";
// import UserForm from "./UserForm"; 



// export default function Users() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     getUsers();
//   }, []);

//   async function getUsers() {
//     try {
//       const response = await fetch("http://localhost:8080/users");
//       const data = await response.json();
//       setUsers(data);
//       console.log(data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   }

//   return (
//     <div>
    
//         {users.map((user) => (
//           <div key={user.id}>
//             <h2>{user.username}</h2>
//             <h4>{user.email}</h4>
//             <ul>
//               {user.contents.map((content, index) => (
//                 <li key={index}>{content}</li>
//               ))}
//             </ul>
//           </div>
//         ))}
//         <UserForm />
    
//     </div>
//   );
// }

