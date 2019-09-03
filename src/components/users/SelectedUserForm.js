import React from 'react';

class SelectedUserForm extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className="user-info-page">
        <header className="form-header">
          <h1>{data.displayName}</h1>
          <p>
            <em>{data.email}</em>
          </p>
        </header>
        <form className="user-info-form" id={`${data.email}-info-form`}>
          <div className="form-row">
            <label htmlFor="user-verification-status">Verification Status</label>
            <select id={`${data.email}-verification`} name={`${data.email}-verification`}>
              <option value="moderator">Moderator</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor={`${data.email}-magisterial-district`}>Magisterial District</label>
            <select
              id={`${data.email}-magisterial-district`}
              name={`${data.email}-magisterial-district`}
            >
              <option value="manager">District Manager</option>
              <option value="1" defaultValue={data.magisterialDistrict === '1' ? 'selected' : ''}>
                1
              </option>
              <option value="2" defaultValue={data.magisterialDistrict === '2' ? 'selected' : ''}>
                2
              </option>
              <option value="3" defaultValue={data.magisterialDistrict === '3' ? 'selected' : ''}>
                3
              </option>
              <option value="4" defaultValue={data.magisterialDistrict === '4' ? 'selected' : ''}>
                4
              </option>
              <option value="5" defaultValue={data.magisterialDistrict === '5' ? 'selected' : ''}>
                5
              </option>
              <option value="6" defaultValue={data.magisterialDistrict === '6' ? 'selected' : ''}>
                6
              </option>
              <option value="7" defaultValue={data.magisterialDistrict === '7' ? 'selected' : ''}>
                7
              </option>
            </select>
          </div>
          <div className="form-row">
            <button className="form-submit">Save</button>
          </div>
        </form>
        <div className="form-row">
          <button className="user-form-cancel">Cancel</button>
        </div>
      </div>
    );
  }
}

export default SelectedUserForm;
