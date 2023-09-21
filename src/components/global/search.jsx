import * as Icon from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useDebounceValue } from '../../hooks/useDebounceValue'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const SearchBar = ({ isMobile, showSearch }) => {
    // State for managing search bar visibility and query
    const [showSearchInput, setShowSearchInput] = useState(false)
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [query, setQuery] = useState("")

    // Declare navigate hook
    const navigate = useNavigate()

    // Toggle the search bar and search results visibility
    const handleShowSearch = () => {
        setShowSearchInput(prev => !prev)
        showSearch(showSearchInput)
        setShowSearchResults(prev => !prev)
    }

    // Handle input change and show/hide search results
    const handleSearch = (e) => {
        e.preventDefault()

        //If the input is empty, hide the search results
        e.target.value !== "" ? setShowSearchResults(true) : setShowSearchResults(false)
        setQuery(e.target.value)
    }

    // Handle Enter key press for searching
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setShowSearchResults(false)
            navigate(`/find/${e.target.value}`)

            //Clear search box and query after navigating to search results
            setQuery('')
        }
    }

    // Handle search button click
    const handleSearchButton = () => {
        navigate(`/find/${query}`)
    }

    // Toggle search results visibility
    const handleShowSearchContainer = () => {
        setShowSearchResults(prev => !prev)
    }

    // Debounce the query for smoother search requests
    const debouncedValue = useDebounceValue(query)

    // Container for displaying search results
    const searchResultsContainer = (
        <div className={`${showSearchResults ? "block" : "hidden"} h-fit w-full bg-slate-900 p-7 absolute top-[80px] lg:top-[40px] left-0 rounded-b-[6px] overflow-hidden space-y-4 border-b-[1px] border-slate-700`}>

        </div>
    )

    // Search bar for mobile view
    const mobileSearch =
        <div>
            <Icon.MagnifyingGlassIcon className={`${showSearchInput ? "translate-x-[-120dvw]" : ""} w-5 h-5 transition ease-in-out delay-150 duration-300`} onClick={handleShowSearch} />
            <div className={`${showSearchInput ? "translate-x-0" : "translate-x-[120%]"} flex items-center justify-between border-[2px] border-slate-300 dark:border-slate-500 p-[10px] rounded-[8px] w-full absolute z-10 h-[40px] top-[calc((100%-40px)/2)] left-0 transition ease-in-out delay-150 duration-300`}>
                <input
                    style={{ backgroundColor: "transparent" }}
                    type="text"
                    placeholder="What do you want to watch?"
                    className="placeholder-slate-500 text-base outline-none focus:outline-none border-none w-full"
                    onChange={handleSearch}
                    value={query}
                />
                <Icon.XMarkIcon className='w-4 h-6' onClick={handleShowSearch} />
            </div>
            {searchResultsContainer}
        </div>

    // Search bar for normal view
    const normalSearch =
        <div className="w-2/5 bg-transparent border-[2px] border-slate-300 text-slate-900 dark:border-slate-500 dark:text-white rounded-[8px] h-[40px] p-[10px] flex items-center justify-between focus-within:border-slate-300 hover:border-slate-300 relative">
            <Icon.MagnifyingGlassIcon className={`${showSearchInput ? "translate-x-[-120dvw]" : ""} w-5 h-5 transition ease-in-out delay-150 duration-300 text-slate-300 dark:text-slate-500`} onClick={handleSearchButton} />
            <input
                style={{ backgroundColor: "transparent" }}
                type="text"
                placeholder="Search through tags"
                className="dark:placeholder-slate-500 placeholder-slate-300 outline-none text-base border-none p-[10px] w-full focus:outline-none"
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                value={query}
            />
            {searchResultsContainer}
        </div>

    return (
        <>
            {/* Display search based on the isMobile value */}
            {isMobile ? mobileSearch : normalSearch}
        </>
    )
}
