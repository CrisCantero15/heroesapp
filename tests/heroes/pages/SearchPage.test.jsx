import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <SearchPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('Debe mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();

    });

    test('Debe mostrar a Batman y el input con el valor del queryString', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole( 'textbox' );
        expect( input.value ).toBe( 'batman' );

        const img = screen.getByRole( 'img' );
        expect( img.src ).toContain( '/assets/heroes/dc-batman.jpg' );

        expect( screen.getByTestId('search').style.display ).toBe( 'none' );

    });

    test('Debe mostrar un error si no se encuentra el hero (batman123)', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const alert = screen.getByLabelText( 'alert-danger' );
        expect( alert.style.display ).toBe( '' );

    });

    test('Debe llamar el Navigate a la pantalla nueva', () => {

        const inputValue = 'batman';

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const formInput = screen.getByRole('textbox');
        const formBtn = screen.getByRole('button');

        fireEvent.input( formInput, { target: { value: inputValue } } );
        fireEvent.click( formBtn );

        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`);

    });

});