import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './AllPopsPage.css';

const PopsTable = () => {
  const pops = useSelector(state => state.pops.pops);

  return (
    <div className="pops-table-container">
      <h1>All Pops</h1>
      <NavLink to="/pop/new" className="create-new-pop-button">
        Create New Pop
      </NavLink>
      <table className="pops-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
            <th>Region</th>
            <th>Status</th>
            <th>Racks</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(pops).map(key => {
            const pop = pops[key];
            return (
              <tr key={key}>
                <td>
                  <NavLink to={`/pop/${pop.name}`}>
                    {pop.name}
                  </NavLink>
                </td>
                <td>{pop.city}</td>
                <td>{pop.country}</td>
                <td>{pop.region}</td>
                <td>{pop.status}</td>
                <td>{pop.rack_count ? pop.rack_count : 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PopsTable;
