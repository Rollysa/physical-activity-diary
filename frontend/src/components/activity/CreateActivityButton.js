import React from "react";
import {Link} from "react-router-dom";

const CreateActivityButton = () => {
  return (
    <React.Fragment>
        <Link to="/addActivity" className="btn btn-primary btn-lg">
            <i className="fas fa-plus-circle"> Log activity</i>
      </Link>
    </React.Fragment>
  );
};

export default CreateActivityButton;
