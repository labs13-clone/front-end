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
    const [popularity,
        setPopularity] = useState('');
    
    const [classes, setClasses] = useState('landing-page__start-btn z-index');

    function scrollFunction() {
        var y = window.scrollY;
        if (y >= 500) {
            setClasses('landing-page__start-btn show')
        } else {
            setClasses('landing-page__start-btn z-index')
        }
        };
        
    window.addEventListener("scroll", scrollFunction);

    function scrollBack() {
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
        });
    }
    
  

    //Get categories on load
    useEffect(() => {
        getCategories();
        getData({difficulty: '1-100'});
    }, []);

    //Get challenges every time the filters are changed
    useEffect(() => {
        const filter = {};
        if (category) 
            filter.category_id = category;
        if (difficulty !== '1-100') 
            filter.difficulty = difficulty;
        getData(filter);
    }, [category, difficulty]);


    function getData(filter) {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/challenges${objToQuery(filter)}`,
            headers: {
                Authorization: `Bearer ${props.auth.accessToken}`
            }
        }).then(result => {
            const sorted = result.data.sort((a,b) => (a.popularity > b.popularity) ? -1 : ((b.popularity > a.popularity) ? 1 : 0));
            setChallenges(sorted);

        }).catch(e => {
            console.log(e);
        });
    }

    function getCategories() {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER}/api/categories`,
            headers: {
                Authorization: `Bearer ${props.auth.accessToken}`
            }
        }).then(result => {
            setCategories(result.data);
        }).catch(e => {
            console.log(e);
        });
    }


    // //Sort by popularity
    // function filterByPopularity(value) {
        
    //     if (value === 'sortby') {
    //         setPopularity('sortby');

    //     } else if (value === 'popular') {
    //         const sorted1 = challenges.sort((a,b) => (a.popularity > b.popularity) ? -1 : ((b.popularity > a.popularity) ? 1 : 0));
    //         setChallenges(sorted1);
    //         setPopularity('popular');
    //     } else if (value === 'notpopular') {
    //         ;
    //         const sorted2 = challenges.sort((a,b) => (a.popularity > b.popularity) ? 1 : ((b.popularity > a.popularity) ? -1 : 0));
    //         setChallenges(sorted2);
    //         setPopularity('notpopular');
            
    //     }
    // }


    return (
        <div className="search-challenges-view">
          <div className="landing-page__start">
            <h3 className={classes}><span onClick={scrollBack}>To The Top</span></h3>
          </div> 
          <div className='filter-container'>
            <CategoriesFilter categories={categories} setCategory={setCategory}/>
            <DifficultyLevels setDifficulty={setDifficulty}/>
          </div>
            <ChallengesContainer auth={props.auth} challenges={challenges} />
        </div>
    )
}

export default SearchChallenges;