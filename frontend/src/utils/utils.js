import Cookies from 'js-cookie'; // Add this import

// export const getUserIdFromToken = () => { // Add export keyword
//     const token = Cookies.get('token');
//     if (token) {
//         try {
//             // --- User's requested decoding logic ---
//             const tokenPayload = JSON.parse(atob(token.split('.')[1]));
//             // Ensure userID is defined, check both 'userID' and 'sub' claims
//             const userID = tokenPayload.userID || tokenPayload.sub;
//             // --- End of user's requested logic ---

//             if (!userID) {
//                 console.error("UserID not found in token payload:", tokenPayload);
//                 return null;
//             }
//             return userID;
//         } catch (error) {
//             console.error("Error decoding token with atob/JSON.parse:", error);
//             // This method might fail with certain characters or padding issues.
//             return null;
//         }
//     }
//     return null;
// };