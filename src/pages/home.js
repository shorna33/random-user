import axios from "axios";
import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";

const Home = () => {
  const [users, setUsers] = useState([]);

  const [order, setOrder] = useState("ASC");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentUsers = users.slice(firstIndex, lastIndex);
  const noOfPage = Math.ceil(users.length / recordsPerPage);

  const baseURL = "https://randomuser.me/api/?results=100";

  //retrive data from api
  useEffect(() => {
    axios.get(baseURL).then((res) => {
      console.log(res.data.results);
      const users = res.data.results;
      setUsers(users);
    });
  }, []);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...users].sort((a, b) =>
        col == 'name' ? a[col].title.toLowerCase() > b[col].title.toLowerCase() ? 1 : -1 : (col == 'location' ? a[col].country.toLowerCase() > b[col].country.toLowerCase() ? 1 : -1 : a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1)
        
        
      );
      setUsers(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...users].sort((a, b) =>
        col == 'name' ? a[col].title.toLowerCase() < b[col].title.toLowerCase() ? 1 : -1 : (col == 'location' ? a[col].country.toLowerCase() < b[col].country.toLowerCase() ? 1 : -1 :  a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1)
      
      );
      setUsers(sorted);
      setOrder("ASC");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <table className="table">
          <thead>
            <tr>
              <th
                scope="col"
                onClick={() => sorting("name")}
              >
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
          {currentUsers.length > 0 ? (
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.phone}>
                  <td>
                    {user.name.title} {user.name.first} {user.name.last}
                  </td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.location.country}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="5">No users Found</td>
              </tr>
            </tbody>
          )}
        </table>

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
      </div>
    </div>
  );
};

export default Home;
