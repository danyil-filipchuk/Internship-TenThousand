import React, { createContext, useContext, useState } from "react";

const themes = {
    light: {
        HeaderTitleColor: '#222',
        HeaderBackgroundColor: '#f4f8fd',
        LinearGradientBackgroundColor: ['#e0ecff', '#f7faff', '#fff'],

        SwitchThumbOn: '#4F8EF7',
        SwitchThumbOff: '#fff',
        SwitchTrackOn: '#B3D2FF',
        SwitchTrackOff: '#ccc',

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

        TaskInputColor: '#222',
        TaskInputBorderColor: '#C3D1E7',
        TaskInputBackgroundColor: '#fafbff',
        TaskInputPlaceholderColor: '#8F9BB3',

        ButtonSaveTaskBackgroundColor: "#4F8EF7",
        ButtonSaveTaskShadowColor: '#000',
        ButtonSaveTaskTextColor: '#fff',

        PhotoPickerLabel: '#222',
        PhotoPickerTextColor: '#4F8EF7',
        PhotoPickerBlockShadowColor: '#4F8EF7',
        PhotoPickerBlockBackgroundColor: '#e7f0ff',

        DeadlinePickerLabel: '#222',
        DeadlinePickerTextColor: '#4F8EF7',
        DeadlinePickerShadowColor: '#4F8EF7',
        DeadlinePickerBackgroundColor: '#e7f0ff',

        LocationPickerLabel: '#222',
        LocationPickerTextColor: '#4F8EF7',
        LocationPickerShadowColor: '#4F8EF7',
        LocationPickerBackgroundColor: '#e7f0ff',

        ContactPickerLabel: '#222',
        ContactPickerTextColor: '#4F8EF7',
        ContactPickerShadowColor: '#4F8EF7',
        ContactPickerBackgroundColor: '#e7f0ff',

        AddTaskScreenBackgroundColor: '#fff',
        AddTaskScreenBorderColor: '#C3D1E7',
        AddTaskScreenShadowColor: '#000',
        AddTaskScreenTitleColor: '#222',

        ButtonAddNewTaskGradient: ['#407BEA', '#539DFF'],
        ButtonAddNewTaskShadowColor: '#B6C3DB',
        ButtonAddNewTaskTextColor: '#fff',

        TaskListCardBackgroundColor: '#fff',
        TaskListCardBorderColor: '#C3D1E7',
        TaskListCardShadowColor: '#000',
        TaskListIndexColor: '#4F8EF7',
        TaskListTextColor: '#222',
        TaskListCompleteTextColor: '#222',
        TaskListEmptyComponentGradient: ['#4961b8', '#324d92', '#232f56'],

        BottomSheetBorderColor: "#E6ECF9",
        BottomSheetShadowColor: "#4F8EF7",
        BottomSheetBackgroundColor: '#fff',

        BottomSheetCloseColor: "#2F326B",
        BottomSheetCloseShadowColor: "#4F8EF7",
        BottomSheetCloseBackgroundColor: '#e7f0ff',

        BottomSheetLabelColor: '#222',
        BottomSheetValueColor: '#4F8EF7',
        BottomSheetShareTaskTextColor: '#2944cc',

        IconColor: '#222',
    },
    dark: {
        HeaderTitleColor: '#fafaff',
        HeaderBackgroundColor: '#181B23',
        LinearGradientBackgroundColor: ['#181C22', '#232A3D', '#232A3D'],

        SwitchThumbOn: '#90B4FE',
        SwitchThumbOff: '#fff',
        SwitchTrackOn: '#274C87',
        SwitchTrackOff: '#6C7189',

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

        TaskInputColor: '#F3F5FA',
        TaskInputBorderColor: '#41476B',
        TaskInputBackgroundColor: '#232A3D',
        TaskInputPlaceholderColor: '#C3CCE7',

        ButtonSaveTaskBackgroundColor: "#233878",
        ButtonSaveTaskShadowColor: '#aab4d4',
        ButtonSaveTaskTextColor: '#EAF2FF',

        PhotoPickerLabel: '#fafaff',
        PhotoPickerTextColor: '#E8EAF6',
        PhotoPickerBlockShadowColor: '#233878',
        PhotoPickerBlockBackgroundColor: '#31395A',

        DeadlinePickerLabel: '#fafaff',
        DeadlinePickerTextColor: '#E8EAF6',
        DeadlinePickerShadowColor: '#233878',
        DeadlinePickerBackgroundColor: '#31395A',

        LocationPickerLabel: '#fafaff',
        LocationPickerTextColor: '#E8EAF6',
        LocationPickerShadowColor: '#233878',
        LocationPickerBackgroundColor: '#31395A',

        ContactPickerLabel: '#fafaff',
        ContactPickerTextColor: '#E8EAF6',
        ContactPickerShadowColor: '#233878',
        ContactPickerBackgroundColor: '#31395A',

        AddTaskScreenBackgroundColor: '#181B23',
        AddTaskScreenBorderColor: '#31395A',
        AddTaskScreenShadowColor: '#000',
        AddTaskScreenTitleColor: '#fafaff',

        ButtonAddNewTaskGradient: ['#2941AB', '#5176C6'],
        ButtonAddNewTaskShadowColor: '#1F2847',
        ButtonAddNewTaskTextColor: '#fff',

        TaskListCardBackgroundColor: 'rgba(255,255,255,0.17)',
        TaskListCardBorderColor: '#324161',
        TaskListCardShadowColor: '#233878',
        TaskListIndexColor: '#90B4FE',
        TaskListTextColor: '#F2F6FC',
        TaskListCompleteTextColor: '#B0B9D1',
        TaskListEmptyComponentGradient: ['#f6faff', '#d3e1ff', '#c6dfff'],

        BottomSheetBorderColor: "#31395A",
        BottomSheetShadowColor: "#000A1C",
        BottomSheetBackgroundColor: '#232A3D',

        BottomSheetCloseColor: "#D6E3FF",
        BottomSheetCloseShadowColor: "#1C2743",
        BottomSheetCloseBackgroundColor: '#31395A',

        BottomSheetLabelColor: '#C5D3F5',
        BottomSheetValueColor: '#6B97E2',
        BottomSheetShareTaskTextColor: '#7A9BEE',

        IconColor: '#fff',
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
