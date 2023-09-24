import axios from "axios";
import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import Search from "../components/search";

const Home = () => {
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  let currentUsers = users.slice(firstIndex, lastIndex);
  const noOfPage = Math.ceil(users.length / recordsPerPage);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [order, setOrder] = useState("ASC");

  const baseURL = "https://randomuser.me/api/?results=5000";

  //retrive data from api
  useEffect(() => {
    axios.get(baseURL).then((res) => {
      console.log(res.data.results);
      const users = res.data.results;
      //transform data
      users.map((user) => {
        return [
          (user.location = user.location.country),
          (user.name = `${user.name.title} ${user.name.first} ${user.name.last}`),
        ];
      });
      setUsers(users);
    });
  }, []);

  const paginate = (event, value) => {
    // console.log(value);
    setCurrentPage(value);
  };

  //Search User
  const handleSearch = (keyword) => {
    setSearchTerm(keyword);
    // console.log(keyword);
    if (keyword !== "") {
      const newUsers = users.filter((user) =>
        Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(keyword.toLowerCase())
      );
      setSearchResult(newUsers);
    } else {
      setSearchResult(users);
    }
    // console.log(searchResult);
  };

  if (searchResult.length > 0) {
    currentUsers = searchResult.slice(firstIndex, lastIndex);
  }

  if (searchTerm.length !== 0 && searchResult.length === 0) {
    currentUsers = [];
  }

  // console.log(searchResult)
  const sorting = (col) => {
    if (order === "ASC") {
      if (searchResult.length > 0 ) {
        const sorted = [...searchResult].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setSearchResult(sorted);
      setOrder("DSC");
      } else {
        const sorted = [...users].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setUsers(sorted);
      setOrder("DSC");
      }    
    }

    if (order === "DSC") {
      if (searchResult.length > 0 ) {
        const sorted = [...searchResult].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setSearchResult(sorted);
      setOrder("ASC");
      } else {
        const sorted = [...users].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setUsers(sorted);
      setOrder("ASC");
      }
      
      
    }
    
    // if (order === "DSC") {
    //   const sorted = [...users].sort((a, b) =>
    //     a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
    //   );
    //   setUsers(sorted);
    //   setOrder("ASC");
    // }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <Search onSearch={handleSearch} />
        <table className="table">
          <thead>
            <tr>
              <th scope="col" onClick={() => sorting("name")}>
                Full Name
              </th>
              <th scope="col" onClick={() => sorting("gender")}>
                Gender
              </th>
              <th scope="col" onClick={() => sorting("email")}>
                Email
              </th>
              <th scope="col" onClick={() => sorting("phone")}>
                Phone
              </th>
              <th scope="col" onClick={() => sorting("location")}>
                Country
              </th>
            </tr>
          </thead>
          {currentUsers.length > 0 && (
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.phone}>
                  <td>{user.name}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.location}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {currentUsers.length === 0 && (
          <h5 className="text-danger">Users Not Found</h5>
        )}

        {searchTerm.length === 0 ? (
          <div className="d-flex justify-content-center pb-3">
            {users.length > recordsPerPage && (
              <Pagination
                color="primary"
                variant="outlined"
                shape="rounded"
                count={noOfPage}
                page={currentPage}
                onChange={paginate}
              />
            )}
          </div>
        ) : (
          <div className="d-flex justify-content-center pb-3">
            {searchResult.length > 8 && (
              <Pagination
                color="primary"
                variant="outlined"
                shape="rounded"
                count={Math.ceil(searchResult.length / recordsPerPage)}
                page={currentPage}
                onChange={paginate}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
