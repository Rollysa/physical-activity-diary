import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPerson, updatePerson } from "../../actions/personActions";
import classnames from "classnames";
import { Link } from "react-router-dom";

class PersonProfile extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      age: "",
      height: "",
      weight: "",
      gender: "",
      restingHeartRate: "",
      bodyFat: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const updatePerson = {
      id: this.state.id,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      age: this.state.age,
      height: this.state.height,
      weight: this.state.weight,
      gender: this.state.gender,
      restingHeartRate: this.state.restingHeartRate,
      bodyFat: this.state.bodyFat
    };

    this.props.updatePerson(this.state.id, updatePerson, this.props.history);
  }

  componentDidMount() {
    const { id } = this.props.security;
    this.props.getPerson(id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      age,
      height,
      weight,
      gender,
      restingHeartRate,
      bodyFat
    } = nextProps.person;

    this.setState({
      id,
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      age,
      height,
      weight,
      gender,
      restingHeartRate,
      bodyFat
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="person-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h6 className="display-4 text-center">My personal profile</h6>
              <form onSubmit={this.onSubmit}>
                <h6>Email Address *</h6>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">@</div>
                    </div>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      disabled
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <h6>First Name *</h6>
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.firstName
                      })}
                      placeholder="First Name"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.onChange}
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <h6>Last name *</h6>
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.lastName
                      })}
                      placeholder="Last Name"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.onChange}
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                </div>
                <h6>Age *</h6>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.age
                    })}
                    placeholder="Age"
                    name="age"
                    value={this.state.age}
                    onChange={this.onChange}
                  />
                  {errors.age && (
                    <div className="invalid-feedback">{errors.age}</div>
                  )}
                </div>
                <h6>Gender *</h6>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="inputmale"
                    name="gender"
                    required
                    className="custom-control-input"
                    value="MALE"
                    onChange={this.onChange}
                  />
                  <label className="custom-control-label" htmlFor="inputmale">
                    Male
                  </label>
                </div>
                <div className="custom-control custom-radio mb-3 custom-control-inline">
                  <input
                    type="radio"
                    id="inputfemale"
                    name="gender"
                    required
                    className="custom-control-input"
                    value="FEMALE"
                    onChange={this.onChange}
                  />
                  <label className="custom-control-label" htmlFor="inputfemale">
                    Female
                  </label>
                </div>
                <hr />
                <h5>Body statistics</h5>
                &nbsp; &nbsp;
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <h6>Height</h6>
                    <div className="input-group">
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.height
                        })}
                        placeholder="Height"
                        name="height"
                        value={this.state.height}
                        onChange={this.onChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">m</div>
                      </div>
                    </div>
                    {errors.height && (
                      <div className="invalid-feedback">{errors.height}</div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <h6>Weight *</h6>
                    <div className="input-group">
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.weight
                        })}
                        placeholder="Weight"
                        name="weight"
                        value={this.state.weight}
                        onChange={this.onChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">kg</div>
                      </div>
                    </div>
                    {errors.weight && (
                      <div className="invalid-feedback">{errors.weight}</div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <h6>Resting heart rate</h6>
                    <div className="input-group">
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.restingHeartRate
                        })}
                        placeholder="Resting heart rate"
                        name="restingHeartRate"
                        value={this.state.restingHeartRate}
                        onChange={this.onChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">bpm</div>
                      </div>
                    </div>
                    {errors.restingHeartRate && (
                      <div className="invalid-feedback">
                        {errors.restingHeartRate}
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <h6>Body fat</h6>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Body fat"
                        name="bodyFat"
                        value={this.state.bodyFat}
                        onChange={this.onChange}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">%</div>
                      </div>
                    </div>
                  </div>
                </div>
                <br/>
                <hr />
                <button type="submit" className="btn btn-primary btn-lg">
                  Update profile
                </button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Link className="card-link" to="/dashboard">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PersonProfile.propTypes = {
  getPerson: PropTypes.func.isRequired,
  updatePerson: PropTypes.func.isRequired,
  person: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security.person,
  person: state.person.person,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getPerson, updatePerson }
)(PersonProfile);
