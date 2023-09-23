import axios from "axios";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);

  const baseURL = "https://randomuser.me/api/?results=100";

  //retrive data from api
  useEffect(() => {
    axios.get(baseURL).then((res) => {
      console.log(res.data.results);
      const users = res.data.results;
      setUsers(users);
    });
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Email</th>
              <th scope="col">Country</th>
            </tr>
          </thead>
          {users.length > 0 ? (
            <tbody>
              {users.map((user) => (
                <tr key={user.phone}>
                  <td>
                    {user.name.title} {user.name.first} {user.name.last}
                  </td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>{user.location.country}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
                <tr>
                    <td colSpan="4">No users Found</td>
                </tr>
              
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Home;
