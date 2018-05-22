import React from 'react';
import classes from './Input.css';

const input = (props) => {

   let inputElement = null;
   let validationError = null;
   const inputClasses = [classes.InputElement];

   if(props.invalid && props.shouldValidate && props.touched){
      inputClasses.push(classes.Invalid);
   }

   if(props.invalid && props.touched){
      validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
   }

   switch(props.elementType) {

      case ('input') :
      inputElement = <input onChange={props.changed} value={props.value} className={inputClasses.join(' ')} {...props.elementConfig}/>;
      break;

      case ('textarea') :
      inputElement = <textarea onChange={props.changed} value={props.value} className={inputClasses.join(' ')} {...props.elementConfig}/>;
      break;

      case ('select') :
      inputElement = (
         <select onChange={props.changed} value={props.value} className={inputClasses.join(' ')}>
            {props.elementConfig.options.map( (option) => {
            return (
               <option key={option.value} value={option.value}>{option.displayValue}</option>
            );
         })
      }
         </select>
      );
      break;

      default :
      inputElement = <input onChange={props.changed} value={props.value} className={inputClasses.join(' ')} {...props.elementConfig}/>;
   }

   return (
      <div className={classes.Input}>
         <label className={classes.Label}>{props.label}</label>
         {inputElement}
         {validationError}
      </div>
   );

}

export default input;
