import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { render, screen } from "@testing-library/react";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('Pruebas en <PrivateRoute />', () => {

    test('Debe mostrar el children si está autenticado y la llamada al localStorage', () => {
    
        Storage.prototype.setItem = jest.fn();
            
        const contextValue = {
            logged: true,
            user: {
                name: 'Juan',
                id: '123'
            }
        };
    
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
    
        expect( screen.getByText( 'Ruta privada' ) ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalled();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/search?q=batman');
    
    });

});