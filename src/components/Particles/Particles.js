import React from 'react';
import Particles from 'react-particles-js';
import './Particles.css';

const ParticlesComponent = () => {

    const options = {
        particles: {
          number: {
            value: 300
          },
          line_linked: {
            shadow:{
              density: {
                value_area: 800,
              }
            }
          }
        }
      }

    return (
        <div>
            <Particles className='particles' params={options}></Particles>
        </div>
    )

}

export default ParticlesComponent
