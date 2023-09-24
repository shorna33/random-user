import React from 'react'

const Search = ({ term, onSearch }) => {

    const getSearchValue = (e) => {
        // console.log(e.target.value);
        onSearch(e.target.value);
    }

    return (
        <div className="form-group">
            <input type="text" className="form-control mb-3" placeholder="Search User" onChange={getSearchValue}/>
        </div>
    )
}

export default Search