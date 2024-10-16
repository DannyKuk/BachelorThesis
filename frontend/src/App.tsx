import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Frontdoor from './entrances/Frontdoor';
import HouseButtons from "./components/HouseButtons";
import Backdoor from "./entrances/Backdoor";

const App: React.FC = () => {


    return (
        <Router>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100vh',
                    textAlign: 'center',
                }}
            >
                <h1>Home Safety Face Recognition</h1>
                <Routes>
                    <Route path="/" element={<HouseButtons />} />
                    <Route path="/frontdoor" element={<Frontdoor />} />
                    <Route path="/backdoor" element={<Backdoor />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
