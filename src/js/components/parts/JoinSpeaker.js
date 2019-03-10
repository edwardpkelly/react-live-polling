import React from "react";

const JoinSpeaker = props => {
  return (
    <form action="javascript:void(0)" onSubmit={() => props.handleStart()}>
      <label>Full Name</label>
      <input
        className="form-control"
        placeholder="Enter your full name..."
        onChange={event => props.handleUpdateSpeaker(event.target.value)}
        required
      />

      <label>Presentation Title</label>
      <input
        className="form-control"
        placeholder="Enter a title for this presentation..."
        onChange={event => props.handleUpdateTitle(event.target.value)}
        required
      />
      <button className="btn btn-primary">Join</button>
    </form>
  );
};

export default JoinSpeaker;
