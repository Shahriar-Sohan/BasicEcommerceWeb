import Navbar from '@/component/Navbar';
import React from 'react';
import Hero from './Hero';
import Story from './Story';
import Mission from './Mission';
import Values from './Values';
import Team from './Team';
import Promise from './Promise';
import Contact from './Contact';

function About() {
    return (
        <div className="bg-white overflow-hidden flex flex-col">
            <Navbar />
            <main className="flex-grow mt-15">
                <Hero />
                <Story />
                <Mission />
                <Values />
                <Team />
                <Promise />
                <Contact />
            </main>
        </div>
    );
};

export default About;