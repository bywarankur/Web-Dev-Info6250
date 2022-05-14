// import React from "react";
// import { useEffect, useState } from "react";

// function Loading() {

//     const [Loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadData = async () => {

//             // Wait for two second
//             await new Promise((r) => setTimeout(r, 2000));

//             // Toggle loading state
//             setLoading((loading) => !loading);
//         };

//         loadData();
//     }, [])
//     if (loading) {
//         return <div>Loading....</div>
//     }

//     // If page is not in loading state, display page.
//     else {
//         return <h1>TodoApp</h1>
//     }
// }

// export default Loading;
