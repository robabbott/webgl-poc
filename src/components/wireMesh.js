import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';

const data = []

class WireMesh extends Component {
  buildScene = () => {
    // Engine & Scene Setup
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color3(48 / 255, 48 / 255, 48 / 255);

    // Build View
    this.addCamera();
    this.addLight();
    this.addPoints();

    // Events
    window.addEventListener('resize', this.onWindowResize, false);

    // Render
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  };

  /**
   * Adds camera to scene
   */
  addCamera = () => {
    // ---------------ArcRotateCamera or Orbit Control----------
    const camera = new BABYLON.ArcRotateCamera(
      'Camera',
      7.85,
      2.5,
      10000,
      BABYLON.Vector3.Zero(),
      this.scene
    );
    camera.wheelPrecision = 0.1;
    camera.minZ = 0.01;
    camera.maxZ = 100000000;

    // This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);
  };

  /**
   * Adds light to scene
   */
  addLight = () => {
    const light = new BABYLON.PointLight(
      'pointLight',
      new BABYLON.Vector3(0, 0, -1000),
      this.scene
    );
    light.range = 1000;
    light.intensity = 2;
  };

  /**
   * Adds point cloud to scene
   */
  addPoints = () => {
    const positions = [];
    const indices = [];

    for (let p = 0; p < data.points.length; p++) {
      indices.push(p);

      for (let i = 0; i < data.points[p].length; i++) {
        positions.push(data.points[p][i]);
      }
    }

    const customMesh = new BABYLON.Mesh('custom', this.scene);
    const vertexData = new BABYLON.VertexData();

    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.applyToMesh(customMesh);

    const material = new BABYLON.StandardMaterial('floor0', this.scene);
    material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    material.wireframe = true;
    customMesh.material = material;
  };

  onWindowResize = () => {
    this.engine.resize();
  };

  componentDidMount() {
    this.buildScene();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize, false);
  }

  render() {
    return (
      <div className='module'>
        <canvas
          ref={(canvas) => {
            this.canvas = canvas;
          }}
        />
      </div>
    );
  }
}

export default WireMesh