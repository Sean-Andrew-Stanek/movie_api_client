//src  ./Documents/GitHub/movie_api_client


import { createRoot } from 'react-dom/client';

// Flag for bundle
import "./index.scss";

// Main component (TODO: add more)
const MovieApplication = () => {
    return (
        <div className="my-flix">
            <div>Test Message</div>
        </div>
    );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to rende3r the app in the rood DOM element
root.render(<MovieApplication />);