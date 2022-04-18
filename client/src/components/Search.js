import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import CoachDetail from './CoachDetail';
import CoachList from './CoachList';

export default function Search({ coaches }) {

    const { search } = window.location;
    const [searchResults, setSearchResults] = useState([]);
    const query = new URLSearchParams(search).get('coach');
    const navigate = useNavigate();


    // const [searchInput, setSearchInput] = useState("");

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setSearchInput(e.target.value);
    //     console.log(searchInput);
    // };

    // if (searchInput.length > 0) {
    //     coaches.filter((coach) => {
    //         return coach.name.match(searchInput);
    //     });
    // }

    const filterCoaches = (coaches, query) => {
        if (!query) {
            console.log("no query");
            return coaches;
            //navigate(`/coaches`);
        }
        console.log("query:", query);
        return coaches.filter((coach) => {
            const coachName = coach.name.toLowerCase();

            if (coachName.includes(query)) {
                console.log("coach name:", coachName);
                return coach;
            }
        });

        //console.log("target:", target);
    };

    const filteredCoaches = filterCoaches(coaches, query);
    console.log("filteredCoaches:", filteredCoaches);




    return (
        <>
            <div className='card-body p-3'>
                <form action="/search" method="get">
                    <label htmlFor="header-search">
                        <span className="visually-hidden">Search ski coaches</span>
                    </label>
                    <input

                        id="header-search"
                        placeholder="Search for ski coaches"
                        name="coach"
                    // onChange={handleChange}
                    // value={searchInput}
                    />
                    <button type="submit">Search</button>
                </form>
                <div className='card-body p-3'>
                    <p>Search results for: {query}</p>
                </div>
                <CoachList coaches={filteredCoaches} />

                {/* // <input
                //     type="search"
                //     placeholder="Search here"
                //     onChange={handleChange}
                //     value={searchInput} /> */}
            </div>
        </>
    )
}
