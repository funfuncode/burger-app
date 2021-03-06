import React from 'react';
import classes from './Order.css';

const order = (props) => {

   let ingredients = [];

   for(let ingredientName in props.ingredients){
      ingredients.push(
         {
            name: ingredientName,
            amount: props.ingredients[ingredientName]
         }
      );
   }

   const ingredientOutput = ingredients.map((ingredient) => {
      return (
         <span key={ingredient.name} style={ {display: 'inline-block', margin: '0 7px', textTransform: 'capitalize', border: '1px solid #ccc', padding: '5px' }}>{ingredient.name} ({ingredient.amount})</span>
      );
   });


   return (
      <div className={classes.Order}>
         <p>Ingredients: {ingredientOutput}</p>

         <p>Price: <strong> {props.totalPrice} USD </strong></p>
      </div>
   );
}

export default order;
