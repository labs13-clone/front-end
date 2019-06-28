import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CategoriesFilter from './CategoriesFilter';
import DifficultyLevels from './DifficultyLevels';
import ChallengesContainer from '../../Shared/ChallengesContainer/ChallengesContainer';
import {objToQuery} from '../../../Utility/objToQuery';
import './SearchChallenges.css';

const SearchChallenges = (props) => {

    const [challenges,
        setChallenges] = useState([]);
    const [categories,
        setCategories] = useState([]);
    const [category,
        setCategory] = useState(null);
    const [difficulty,
        setDifficulty] = useState('1-100');
    const [search,
        setSearch] = useState('');
    const [classes,
        setClasses] = useState('landing-page__start-btn z-index');

    function scrollFunction() {
        var y = window.scrollY;
        if (y >= 200) {
            setClasses('landing-page__start-btn show')
        } else {
            setClasses('landing-page__start-btn z-index')
        }
    };

    window.addEventListener("scroll", scrollFunction);

    function scrollBack() {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
    }

    //Get categories on load
    useEffect(() => {
        getCategories();
        getData({difficulty: '1-100'});
    }, []);

    //Get challenges every time the filters are changed
    useEffect(() => {

        //Setup empty filter By default it gets all challenges
        const filter = {};

        //Add filters to the query if user selects them
        if (category) 
            filter.category_id = category;
        if (difficulty !== '1-100') 
            filter.difficulty = difficulty;
        if (search !== '') 
            filter.title = search;
        
        getData(filter);

    }, [category, difficulty, search]);

    function getData(filter) {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/challenges${objToQuery(filter)}`,
            headers: {
                Authorization: `Bearer ${props.auth.accessToken}`
            }
        }).then(firstResults => {

            if (search !== '') {

                // Todo: Make a less hacky simultaneous category and title search query param
                // For now, we'll concatenate results from title and category_name results And
                // remove duplicates.. Toggle filter
                delete filter.title;
                filter.category_name = search;

                axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_SERVER}/api/challenges${objToQuery(filter)}`,
                    headers: {
                        Authorization: `Bearer ${props.auth.accessToken}`
                    }
                }).then(secondResults => {

                    //Setup result
                    const parsedResults = [];

                    //Push unique array objects to parsedResults
                    firstResults
                        .data
                        .concat(secondResults.data)
                        .forEach(res => {
                            if (!parsedResults.find(challenge => challenge.id === res.id)) 
                                parsedResults.push(res);
                            }
                        )

                    //Set state to parsed challenges
                    setChallenges(parsedResults);

                }).catch(e => {
                    console.log(e);
                });

            } else {

                //If there's no search filter
                //Then set the challenges as-is
                //Only one request is necc.
                setChallenges(firstResults.data);
            }

        }).catch(e => {
            console.log(e);
        });
    }

    function getCategories() {
        axios({
            method: 'get',
            url: `${process
                .env
                .REACT_APP_SERVER}/api/categories${objToQuery({
                challenges: true})}`,
                headers: {
                    Authorization: `Bearer ${props.auth.accessToken}`
                }
            })
                .then(result => {
                    setCategories(result.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

        function searchChangeHandler(event) {
            setSearch(event.target.value);
        }

        return (
            <div className="search-challenges-view">
                <div className="landing-page__start">
                    <h3 className={classes}>
                        <span onClick={scrollBack}>To The Top</span>
                    </h3>
                </div>
                <div className='filter-container'>
                    <CategoriesFilter categories={categories} setCategory={setCategory}/>
                    <input className="search" value={search} onChange={searchChangeHandler} placeholder="Search by title or category"/>
                    <DifficultyLevels setDifficulty={setDifficulty}/>
                </div>
                <ChallengesContainer auth={props.auth} challenges={challenges}/>
            </div>
        )
    }

    export default SearchChallenges;