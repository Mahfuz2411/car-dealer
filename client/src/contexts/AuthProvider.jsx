import { createContext, useState } from "react";
export const AuthContext = createContext(null);
// import { useEffect } from "react";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "mahfuz2411",
    email: "abc@cde.com",
    access: "dealer"
  });
  // const [isLoading, setIsLoading] = useState(true);

    

  const authInfo = {
    user,
    // createUser,
    // signInUser,
    // signInWithGoogle,
    // logOut,
    // isLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
