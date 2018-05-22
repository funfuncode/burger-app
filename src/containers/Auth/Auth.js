import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';


class Auth extends Component {

   state = {

      controls: {

         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Email'
            },
            value: '',
            validation: {
               required: true,
               isEmail: true
            },
            valid: false,
            touched: false
         },
         password: {
            elementType: 'input',
            elementConfig: {
               type: 'password',
               placeholder: 'Password'
            },
            value: '',
            validation: {
               required: true,
               minLength: 6
            },
            valid: false,
            touched: false
         }
      },
      isSignUp: true
   }

   componentDidMount(){
      if(!this.props.building && this.props.authRedirectPath !== '/'){
         this.props.onSetAuthRedirectPath();
      }
   }

   checkValidity = (value, rules) => {
      let isValid = true;

      if(rules.required){
         isValid = value.trim() !== '' && isValid;
      }

      if(rules.minLength){
         isValid = value.length >= rules.minLength && isValid;
      }

      if(rules.maxLength){
         isValid = value.length <= rules.maxLength && isValid;
      }

      if(rules.isEmail){
         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
         isValid = pattern.test(value) && isValid;
      }

      return isValid;
   }

   inputChangedHandler = (event, controlName) => {
      const updatedControls = {
         ...this.state.controls,
         [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
            touched: true
         }
      };
      this.setState( { controls: updatedControls } );
   }

   submitHandler = (event) => {
      event.preventDefault();
      this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
   }

   switchAuthModeHandler = () => {
      this.setState( { isSignUp: !this.state.isSignUp } );
   }

   render() {
      const formElementsArray = [];

      for(let key in this.state.controls){
         formElementsArray.push(
            {
               id: key,
               config: this.state.controls[key]
            }
         );
      }

      let form = formElementsArray.map( (formElement) => {
         return (
            <Input
               changed={ (event) => this.inputChangedHandler(event, formElement.id) }
               key={formElement.id}
               elementType={formElement.config.elementType}
               elementConfig={formElement.config.elementConfig}
               value={formElement.config.value}
               invalid={!formElement.config.valid}
               shouldValidate={formElement.config.validation}
               touched={formElement.config.touched}
            />
         );
      }
   );

   const errorArray = [
      { inMessage: 'EMAIL_NOT_FOUND', outMessage: 'Email not found' },
      { inMessage: 'INVALID_PASSWORD', outMessage: 'Password is invalid'},
      { inMessage: 'EMAIL_EXISTS', outMessage: 'Email is taken, please try another one'}
   ];

   let errorMessage = null;

   if(this.props.error){
      errorMessage = errorArray.filter( (errorEl) => errorEl.inMessage === this.props.error.response.data.error.message).map( (el) => (<p key={el.outMessage} style={{color: 'red'}}>{el.outMessage}</p>) );
   }

   if(this.props.loading){
      form = <Spinner/>;
   }

   let authRedirect = null;

   if(this.props.auth){
         authRedirect = <Redirect to={this.props.authRedirectPath} />;
   }


   return (
      <Aux>
      { authRedirect }
      <div className={classes.Auth}>
         <h3>{this.state.isSignUp ? 'Sign up' : 'Sign in'}</h3>
         {errorMessage}
         <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType="Success">Submit</Button>
         </form>
         <Button btnType="Danger" clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignUp ? 'Sign in' : 'Sign up'}</Button>
      </div>
      </Aux>
   );
}
}
const mapStateToProps = (state) => {
   return {
      loading: state.auth.loading,
      error: state.auth.error,
      auth: state.auth.token,
      building: state.burgerBuilder.building,
      authRedirectPath: state.auth.authRedirectPath
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp) ),
      onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
