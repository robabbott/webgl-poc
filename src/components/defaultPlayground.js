import React from 'react'
import { Engine, Mesh, Scene, Sphere } from 'react-babylonjs'
import { Vector3 } from '@babylonjs/core';

function DefaultPlayground() {
  return (
    <div className='module'>
      <Engine
        antialias={true}
        adaptToDeviceRatio={true}
        canvasId='sample-canvas'
      >
        <Scene>
          <arcRotateCamera
            name='camera'
            alpha={0}
            beta={0}
            radius={10}
            target={Vector3.Zero()}
            setPosition={[new Vector3(10, 10, 10000)]}
            wheelPrecision={0.25}
            minZ={0.01}
            maxZ={100000000}
          />
          <hemisphericLight
            name='light1'
            intensity={0.7}
            direction={Vector3.Up()}
          />
          <Sphere
            name='sphere1'
            diameter={1000}
            segments={16}
            position={new Vector3(0, 0, 0)}
          />
        </Scene>
      </Engine>
    </div>
  );
}

export default DefaultPlayground