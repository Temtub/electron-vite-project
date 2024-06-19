import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { restful } from '/restApi/index';
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Mock for restful module
jest.mock('/restApi/index', () => ({
    restful: jest.fn(),
}));

// Mock of the component ShowMessage
jest.mock('Components/specialMessages/ShowMessage', () => ({
    ShowMessage: ({ msg }) => <div>{msg}</div>,
}));

// Mock of hook useNavigate
const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

// Mock for the locastorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock for window.ipcRenderer of electron
Object.defineProperty(window, 'ipcRenderer', {
    value: {
        callXmppConnect: jest.fn(),
    },
});

test('renders Login component', () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
    expect(screen.getByText('Inicia sesión')).toBeInTheDocument();
});

test('shows error message when fields are empty', async () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
    const loginButton = screen.getByText('Iniciar sesión');
    fireEvent.click(loginButton);
    expect(await screen.findByText('Rellene todos los datos')).toBeInTheDocument();
});


test('calls API and navigates on successful login', async () => {
    // Expected data in a correct response
    restful.mockResolvedValueOnce({
        status: true,
        data: { status: true, token: 'fakeToken' },
    });

    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    // Put the data in the form
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'Alberto' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'Alberto' } });

    // Push button 
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar sesión/i }));

    await waitFor(() => {
        expect(restful).toHaveBeenCalledWith("POST", "/api/login", {
            user: 'Alberto',
            pass: 'Alberto'
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fakeToken');
         expect(mockedUseNavigate).toHaveBeenCalledWith('/chat');
    });
});

test('shows error message on API error', async () => {
    restful.mockResolvedValueOnce({
        status: false,
        msg: 'Error al iniciar sesión',
    });

    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
        target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
        target: { value: 'Password123!' },
    });

    fireEvent.click(screen.getByText('Iniciar sesión'));

    expect(await screen.findByText('Error al iniciar sesión')).toBeInTheDocument();
});

// Execute this one before the next one to not occur error
test('displays message from URL params', async () => {
    const mockParams = { msg: 'Se ha cerrado sesión' };

    // For it to have useParams
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useParams: () => mockParams,
    }));

    // Render the login with the message
    render(
        <MemoryRouter initialEntries={['/Se%20ha%20cerrado%20sesi%C3%B3n']}>
            <Routes>
                <Route index path='/:msg' element={<Login />} />
            </Routes>
        </MemoryRouter>
    );

    // Search the message in the DOM
    const messageElement = await screen.findByText('Se ha cerrado sesión');
    expect(messageElement).toBeInTheDocument();
});

describe('Login component', () => {
    it('redirects to /chat if token exists in localStorage', async () => {
        // Setup localStorage with a token
        localStorageMock.getItem.mockReturnValue('fakeToken');

        // Render the Login component
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        // Verify the correct send to /chat
        await waitFor(() => {
            expect(mockedUseNavigate).toHaveBeenCalledWith('/chat');
        });
    });
});
