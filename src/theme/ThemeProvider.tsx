import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the shape of the context value
interface ThemeContextValue {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with an initial value
export const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    setTheme: () => { }
});

// Define the props for the ThemeProvider component
interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Use localStorage to store the selected theme
    const [theme, setTheme] = useState<string>(
        localStorage.getItem('theme') || 'light'
    );

    // Update the theme in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

// Custom hook to access the theme context
export const useTheme = () => {
    return useContext(ThemeContext);
};
