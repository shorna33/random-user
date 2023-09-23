import axios from "axios";
import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";

const Home = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Full Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Country</th>
            </tr>
          </thead>
          {currentUsers.length > 0 ? (
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.phone}>
                  <td>{user.id.value}</td>
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
                <td colSpan="6">No users Found</td>
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
