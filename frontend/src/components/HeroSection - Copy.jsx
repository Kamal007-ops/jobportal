import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (query.trim()) { // Ensure query is not empty or whitespace
            dispatch(setSearchedQuery(query.trim()));
            navigate('/browse');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') { // Allow "Enter" key to trigger search
            searchJobHandler();
        }
    };

    return (
        <div className="text-center">
            <div className="flex flex-col gap-5 my-10">
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
                    "The Smart Way to Find Your Next Career Milestone"
                </span>
                <h1 className="text-5xl font-bold">
                    Unlock Your Future, <br /> Find, Apply & <span className="text-[#F83002]">Land Your Dream Job</span>
                </h1>

                <p className="text-gray-600 font-medium">"Empowering Businesses, Inspiring Growth."</p>
                <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="outline-none border-none w-full px-3 py-2 text-gray-800"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-r-full bg-[#6A38C2] text-white px-4 py-2"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
