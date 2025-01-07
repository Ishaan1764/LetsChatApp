import {create} from "zustand";

export const useThemeStore= create((set)=>(
    {
        theme:localStorage.getItem("your-theme")||"retro",
        setTheme:(theme)=>{
            localStorage.setItem("your-theme",theme);
            set({theme});
        }
    }
));