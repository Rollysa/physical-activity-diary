import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {savePassword } from "../../actions/securityActions";
import {resetPassword } from "../../actions/securityActions";
import classnames from "classnames";
import { Link } from "react-router-dom";
import queryString from 'query-string'

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      confirmPassword: "",
      token: "",
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
    const newPassword = {
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      token: this.state.token
    };

    this.props.savePassword(newPassword, this.props.history);
  }

  componentDidMount() {
    const result = queryString.parse(this.props.location.search);
    this.setState({token: result.token});
    this.props.resetPassword(result.token, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="resetPassword">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Reset Your Password</h1>
              <form onSubmit={this.onSubmit}>
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
                <button type="submit" className="btn btn-primary btn-lg">
                  Reset
                </button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Link className="card-link" to="/login">
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

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  savePassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {resetPassword, savePassword}
)(ResetPassword);
