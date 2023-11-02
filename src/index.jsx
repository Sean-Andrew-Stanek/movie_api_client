//src  ./Documents/GitHub/movie_api_client

//Root
import { createRoot } from 'react-dom/client';
import Container from 'react-bootstrap/Container';

//SCSS file
import "./index.scss";

import { MainView } from './components/main-view/main-view'

// Main component (TODO: add more)
const App = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );
};

// Finds the root and renders the Page
const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);