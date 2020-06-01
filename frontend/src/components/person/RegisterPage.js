import React, { Component } from "react";
import { createNewPerson } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

class RegisterPage extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: "",
      height: "",
      weight: "",
      gender: "",
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
    const newPerson = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      age: this.state.age,
      height: this.state.height,
      weight: this.state.weight,
      gender: this.state.gender
    };

    this.props.createNewPerson(newPerson, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onSubmit}>
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
                <h6>Email Address *</h6>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">@</div>
                    </div>
                    <input
                      type="email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                      })}
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>
                <h6>Password *</h6>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <span className="input-group-addon">
                          <i className="fa fa-key fa-fw" />
                        </span>
                      </div>
                    </div>
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>
                <h6>Confirm Password *</h6>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.confirmPassword
                    })}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
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
                <p />
                <button type="submit" className="btn btn-primary btn-block">
                  Create Account
                </button>
                <p className="text-muted text-center">
                  Already have an account? {escape}
                  <Link className="card-link" to="/login">
                    Log In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  createNewPerson: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createNewPerson }
)(RegisterPage);
