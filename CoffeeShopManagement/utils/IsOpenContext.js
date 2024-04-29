import React, { createContext, useState, useContext } from "react";

const IsOpenContext = createContext();

export const IsOpenProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<IsOpenContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</IsOpenContext.Provider>
	);
};

export const useIsOpen = () => useContext(IsOpenContext);
