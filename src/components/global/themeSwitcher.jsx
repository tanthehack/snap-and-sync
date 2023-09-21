import { useState } from "react"
import * as Icon from 'react-icons/hi'

export const ThemeSwitcher = ({ className }) => {
    const [currentTheme, setCurrentTheme] = useState('dark');

    const handleThemeSwitch = () => {
        // if set via local storage previously
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                setCurrentTheme('light');
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                setCurrentTheme('dark');
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
    }

    return (
        <button onClick={handleThemeSwitch} className={className}>
            {currentTheme === 'dark' ? <Icon.HiMoon /> : <Icon.HiSun />}
        </button>
    )
}