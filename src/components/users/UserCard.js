import React from 'react';
import './UserCard.css';

class UserCard extends React.Component {
  render() {
    const { data, toggle } = this.props;
    return (
      <li className="user-list__item-container" id={data.id}>
        <div className="users-list__item top" onClick={() => toggle(data.id)}>
          <h4>{data.displayName}</h4>
        </div>

        <div className="options">
          <div className="options-btn js-edit-btn" onClick={() => this.props.selectUser(data)}>Edit</div>
        </div>

        <div className="users-list__item bottom" />
      </li>
    );
  }
}

export default UserCard;
