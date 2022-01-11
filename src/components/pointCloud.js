import React, { Component, useState, useEffect } from 'react';
import { getQuery } from '../util/util';
import * as BABYLON from 'babylonjs';
import Loader from '../components/loader'

class PointCloud extends Component {
  state = {
    loading: false,
    data: [],
  };

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
    const data = this.state.data;

    const mat = new BABYLON.StandardMaterial('mat', this.scene);
    mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    mat.disableLighting = true;

    const plane = BABYLON.MeshBuilder.CreateIcoSphere(
      'plane',
      { subdivisions: 1, radius: 10 },
      this.scene
    );

    const SPS = new BABYLON.SolidParticleSystem('SPS', this.scene);
    SPS.addShape(plane, data.length);

    const mesh = SPS.buildMesh();
    mesh.material = mat;
    mesh.position.y = -50;
    mesh.position.x = -50;
    mesh.freezeWorldMatrix();
    mesh.alwaysSelectAsActiveMesh = true;
    plane.dispose(); // free memory

    SPS.initParticles = () => {
      for (let p = 0; p < data.length; p++) {
        SPS.particles[p].position.x = data[p][0];
        SPS.particles[p].position.y = data[p][1];
        SPS.particles[p].position.z = data[p][2];
      }
    };

    SPS.initParticles();
    SPS.setParticles();
  };

  onWindowResize = () => {
    this.engine.resize();
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });

    const query = getQuery('points');
    fetch('./json/dolomite-pool-' + query + '.json')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          loading: false,
          data: data.points,
        });
      });
  }

  componentDidUpdate() {
    this.buildScene();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize, false);
  }

  render() {
    return (
      <div className='module'>
        {this.state.loading ? <Loader /> : ''}
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