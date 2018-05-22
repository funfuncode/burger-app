import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {

   return class extends Component {

      state = {
         error: null
      }

      componentWillMount(){

         this.reqInterceptror = axios.interceptors.request.use((request) => {
            this.setState({error: null});
            return request;
         });

         this.resInterceptror = axios.interceptors.response.use(response => response, error => {
            this.setState({error: error});
         });
      }

      componentWillUnMount(){
         axios.interceptors.request.reject(this.reqInterceptror);
         axios.interceptors.response.reject(this.resInterceptror);
      }

      errorConfirmedHandler = () => {
         this.setState({error: null});
      }

      render(){
         return (
            <Aux>
               <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>{ this.state.error ? this.state.error.message : null }</Modal>
               <WrappedComponent {...this.props}/>
            </Aux>
         );
      }
   }

};

export default withErrorHandler;
