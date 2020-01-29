import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../../context/User/userContext';

const UserItem = ({ user }) => {
  const userContext = useContext(UserContext);
  const { deleteUser } = userContext;

  const { _id, firstName, lastName, email, phone, bvn, password } = user;

  const onDelete = () => {
    deleteUser(_id);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {firstName}{' '}
        <span style={{ float: 'right' }}>
          {/* {type.charAt(0).toUpperCase() + type.slice(1)} */}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}

        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>

      <p>
        <button
          className="btn btn-dark btn-sm"
          // onClick={() => setCurrent(user)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

UserItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default UserItem;
