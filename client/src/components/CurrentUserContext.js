
import { createContext, useState, useEffect } from "react";

const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("idle");
const [favoriteRestaurant, setFavoriteRestaurant] = useState(null)

//having a useEffect so that whenever the user is logged in, I can fetched his data from MongoDB
  useEffect(() => {
    fetch("/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        }
        setCurrentUser(data.data);
        setStatus("loaded");
        console.log(data.data);
      })
      .catch((error) => {
        setStatus("error");
        console.log(error);
      });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, status, setStatus }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;