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
            setChallenges(result.data);
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


    return (
        <div className="search-challenges-view">
          <div className='filter-container'>
            <CategoriesFilter categories={categories} setCategory={setCategory}/>
            <DifficultyLevels setDifficulty={setDifficulty}/>
          </div>
            <ChallengesContainer auth={props.auth} challenges={challenges}/>
        </div>
    )
}

export default SearchChallenges;