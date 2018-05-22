import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should return object with loading: true', () => {
        expect(reducer(undefined, { type: 'AUTH_START' } )).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: true,
            authRedirectPath: '/'
        });
    });

    it('should return object with token 777 and userId 5', () => {
        expect(reducer(undefined, {type: actionTypes.AUTH_SUCCESS, token: 777, userId: 5})).toEqual({
            token: 777,
            userId: 5,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })
});
