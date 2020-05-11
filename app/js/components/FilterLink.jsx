import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';

const FilterLink = ({ filter, children }) => (
  <NavLink
    exact
    to={filter === 'all' ? '' : '/' + filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}>
    {children}
  </NavLink>
);
FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default FilterLink;