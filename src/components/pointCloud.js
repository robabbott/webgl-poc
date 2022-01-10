import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import data from '../json/dolomite-pool-124733.json';

const positions = data.points

class PointCloud extends Component {
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
    var mat = new BABYLON.StandardMaterial('mat', this.scene);
    mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    mat.disableLighting = true;

    var particleCount = positions.length;
    var plane = BABYLON.MeshBuilder.CreateIcoSphere(
      'plane',
      { subdivisions: 1, radius: 8 },
      this.scene
    );
    var SPS = new BABYLON.SolidParticleSystem('SPS', this.scene);
    SPS.addShape(plane, particleCount);
    var mesh = SPS.buildMesh();
    mesh.material = mat;
    mesh.position.y = -50;
    mesh.position.x = -50;
    mesh.freezeWorldMatrix();
    mesh.alwaysSelectAsActiveMesh = true;
    plane.dispose(); // free memory

    SPS.initParticles = () => {
      for (let p = 0; p < positions.length; p++) {
        SPS.particles[p].position.x = positions[p][0];
        SPS.particles[p].position.y = positions[p][1];
        SPS.particles[p].position.z = positions[p][2];
      }
    };

    // init all particle values and set them once
    SPS.initParticles();
    SPS.setParticles();
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

export default PointCloud