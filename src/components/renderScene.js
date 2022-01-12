import React, { Component } from 'react';
import { getQuery } from '../util/util';
import * as BABYLON from 'babylonjs';
import Loader from '../components/loader'

/**
 * RenderScene: Class used for rendering Babylon point clouds and wire meshes
 */
class RenderScene extends Component {
  state = {
    loading: false,
    data: [],
  };

  /**
   * Parent function for building the Babylon scene
   */
  buildScene = () => {
    if (this.state.data.length < 1) {
      return;
    }

    const type = getQuery('type');

    // Engine & Scene Setup
    // Color3 values are calculated using the RGB value divided by 255
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color3(48 / 255, 48 / 255, 48 / 255);

    // Build View
    this.addCamera();
    // this.addLight();

    if (type === 'cloud') {
      this.addCloud();
    } else if (type === 'mesh') {
      this.addMesh();
    }

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
    this.camera = new BABYLON.ArcRotateCamera(
      'Camera',
      7.85,
      2.5,
      10000,
      BABYLON.Vector3.Zero(),
      this.scene
    );
    this.camera.wheelPrecision = 0.1;
    this.camera.minZ = 0.01;
    this.camera.maxZ = 100000000;

    // Allows camera to rotate infinitely
    this.camera.lowerBetaLimit = null
    this.camera.upperBetaLimit = null;
    this.camera.allowUpsideDown = true;

    // This attaches the camera to the canvas
    this.camera.attachControl(this.canvas, true);
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
  addCloud = () => {
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

  /**
   * Adds wire mesh to scene
   */
  addMesh = () => {
    const data = this.state.data;
    const positions = [];
    const indices = [];

    for (let p = 0; p < data.length; p++) {
      indices.push(p);

      for (let i = 0; i < data[p].length; i++) {
        positions.push(data[p][i]);
      }
    }

    const customMesh = new BABYLON.Mesh('mesh', this.scene);
    const vertexData = new BABYLON.VertexData();

    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.applyToMesh(customMesh);

    const material = new BABYLON.StandardMaterial('mat', this.scene);
    material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    material.wireframe = true;
    customMesh.material = material;
  };

  /**
   * Resize Babylon engine on window resize
   */
  onWindowResize = () => {
    this.engine.resize();
  };

  /**
   * Set loading state and fetch json file on mount
   */
  componentDidMount() {
    this.setState({
      loading: true,
    });

    const model = getQuery('model');
    fetch('./json/' + model + '.json')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          loading: false,
          data: data.points,
        });
      });
  }

  /**
   * When state is updated (data received), build the scene
   */
  componentDidUpdate() {
    this.buildScene();
  }

  /**
   * Remove window resize listener
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize, false);
  }

  /**
   * Render the component markup
   */
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

export default RenderScene