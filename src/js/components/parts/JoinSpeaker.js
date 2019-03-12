import React from "react";
import PropTypes from 'prop-types';

const JoinSpeaker = props => {
  const {
    handleStart,
    handleUpdateSpeaker,
    handleUpdateTitle
  } = props;

  return (
    <form action="javascript:void(0)" onSubmit={() => handleStart()}>
      <label>Full Name</label>
      <input
        className="form-control"
        placeholder="Enter your full name..."
        onChange={event => handleUpdateSpeaker(event.target.value)}
        required
      />

      <label>Presentation Title</label>
      <input
        className="form-control"
        placeholder="Enter a title for this presentation..."
        onChange={event => handleUpdateTitle(event.target.value)}
        required
      />
      <button className="btn btn-primary">Join</button>
    </form>
  );
};

JoinSpeaker.propTypes = {
  handleStart: PropTypes.func.isRequired,
  handleUpdateSpeaker: PropTypes.func.isRequired,
  handleUpdateTitle: PropTypes.func.isRequired
};

export default JoinSpeaker;
