import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en authReducer', () => {

    test('Debe retornar el estado por defecto', () => {

        const state = authReducer({ logged: false }, {});
        expect( state ).toEqual({ logged: false });

    });

    test('Debe (login) llamar el login autenticar y establecer el user', () => {

        const action = {
            type: '[Auth] Login',
            payload: {
                name: 'Juan',
                id: '123'
            } 
        };

        const state = authReducer({ logged: false }, action);
        expect( state ).toEqual({ logged: true, user: action.payload });

    });

    test('Debe (logout) borrar el name del usuario y logged en false', () => {

        const action = {
            type: types.logout
        };

        const state = {
            logged: true,
            payload: {
                name: 'Juan',
                id: '123'
            }
        }

        const newState = authReducer( state, action );
        expect( newState ).toEqual({ logged: false });
        
    });

});