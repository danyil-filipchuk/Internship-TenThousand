import React, { createContext, useContext, useState } from "react";
import {ButtonSaveTask} from "./components/AddTaskScreen/ButtonSaveTask";

const themes = {
    light: {
        DeviceInfoHeaderColor: '#222',
        DeviceInfoHLabelColor: '#5D6A8A',
        DeviceInfoValueColor: '#242A4D',
        DeviceInfoBorderColor: '#232A3D',
        DeviceInfoBackgroundColor: 'rgba(255,255,255,0.15)',
        DeviceInfoShadowColor: '#6E9DF7',
        WebViewBlockBorderColor: '#232A3D',
        WebViewBlockBackgroundColor: 'rgba(255,255,255,0.15)',
        WebViewBlockShadowColor: "#6E9DF7",
        WebViewTextColor:'#222',
        WebViewButtonBackgroundColor: '#4F8EF7',
        WebViewButtonTextColor: '#fff',
        ButtonSaveTaskBackgroundColor: "#4F8EF7",
        ButtonSaveTaskShadowColor: '#000',
        ButtonSaveTaskTextColor: '#fff',
        PhotoPickerTextColor: '#4F8EF7',
        PhotoPickerBlockShadowColor: '#4F8EF7',
        PhotoPickerBlockBackgroundColor: '#e7f0ff',
    },
    dark: {
        DeviceInfoHeaderColor: '#fafaff',
        DeviceInfoHLabelColor: '#A5B9D1',
        DeviceInfoValueColor: '#CDD5F3',
        DeviceInfoBorderColor: '#B7C6E5',
        DeviceInfoBackgroundColor: 'rgba(24, 34, 56, 0.85)',
        DeviceInfoShadowColor: '#122143',
        WebViewBlockBorderColor: '#E3EAF8',
        WebViewBlockBackgroundColor: 'rgba(28,32,44,0.45)',
        WebViewBlockShadowColor: '#232A3D',
        WebViewTextColor:'#fafaff',
        WebViewButtonBackgroundColor: '#233878',
        WebViewButtonTextColor: '#EAF2FF',
        ButtonSaveTaskBackgroundColor: "#233878",
        ButtonSaveTaskShadowColor: '#aab4d4',
        ButtonSaveTaskTextColor: '#EAF2FF',
        PhotoPickerTextColor: '#E8EAF6',
        PhotoPickerBlockShadowColor: '#233878',
        PhotoPickerBlockBackgroundColor: '#192034',

    },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [themeName, setThemeName] = useState("light");
    const toggleTheme = () =>
        setThemeName((t) => (t === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider
            value={{ theme: themes[themeName], themeName, toggleTheme }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
