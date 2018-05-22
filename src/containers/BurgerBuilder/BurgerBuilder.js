import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {

   state = {
      purchasing: false
   }

   componentDidMount(){
      this.props.onInitIngredients();
   }

   updatePurchaseState(ingredients) {

      const sum = Object.keys(ingredients)
      .map(igKey => {return ingredients[igKey]})
      .reduce((sum, el) => {return (sum + el)}, 0 );

      return sum > 0;
   }


   purchaseHandler = () => {
      if(this.props.auth){
         this.setState( {purchasing: true} );
      } else {
         this.props.onSetAuthRedirectPath('/checkout');
         this.props.history.push('/auth');
      }
   };

   purchaseCancelHandler = () => {
      this.setState({purchasing: false});
   };

   purchaseContinueHandler = () => {
      this.props.onPurchaseInit();
      this.props.history.push('/checkout');
   }


   render(){
      const disabledInfo = {...this.props.ingredients};

      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0
      }

      let orderSummary = null;

      let burger = this.props.error ? <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'margin-top': '150px'}}>Ingredients can't be loaded</p> : <Spinner />;


      if(this.props.ingredients){
         burger = (
            <Aux>
               <Burger ingredients={this.props.ingredients} />
               <BuildControls
                  price={this.props.totalPrice}
                  purchasable={ this.updatePurchaseState(this.props.ingredients) }
                  ordered={this.purchaseHandler}
                  disabled={disabledInfo}
                  ingredientAdded={ this.props.onAddIngredient }
                  ingredientRemoved={ this.props.onRemoveIngredient }
                  auth={this.props.auth}
               />
            </Aux>
         );
         orderSummary = <OrderSummary
            price={this.props.totalPrice}
            ingredients={this.props.ingredients}
            purchaseContinued={this.purchaseContinueHandler}
            purchaseCanceled={this.purchaseCancelHandler}/>;
         }


         return (
            <Aux>
               <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  {orderSummary}
               </Modal>
               {burger}
            </Aux>
         );
      }
   }

   const mapStateToProps = (state) => {
      return {
         ingredients: state.burgerBuilder.ingredients,
         totalPrice: state.burgerBuilder.totalPrice,
         error: state.burgerBuilder.error,
         auth: state.auth.token !== null
      };
   };

   const mapDispatchToProps = (dispatch) => {
      return {
         onAddIngredient: (ingredientName) => dispatch( actions.addIngredient(ingredientName) ),
         onRemoveIngredient: (ingredientName) => dispatch( actions.removeIngredient(ingredientName) ),
         onInitIngredients: () => dispatch( actions.initIngredients() ),
         onPurchaseInit: () => dispatch(actions.purchaseInit() ),
         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path) )
      }
   };

   export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
