import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import Loader from '../components/loader';

class SkyBox extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    this.setState({
      loading: true
    });

    var engine = new BABYLON.Engine(this.canvas, true);
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(48 / 255, 48 / 255, 48 / 255);
    var camera = new BABYLON.ArcRotateCamera(
      'Camera',
      -Math.PI / 2,
      Math.PI / 2,
      5,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.wheelPrecision = 1;
    camera.lowerBetaLimit = null;
    camera.upperBetaLimit = null;
    camera.allowUpsideDown = true;
    camera.attachControl(this.canvas, true);

    var light = new BABYLON.HemisphericLight(
      'hemiLight',
      new BABYLON.Vector3(-1, 1, 0),
      scene
    );
    light.diffuse = new BABYLON.Color3(1, 0, 0);

    // Skybox
    var skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 4096 }, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
      './textures/skybox2',
      scene
    );
    skyboxMaterial.reflectionTexture.coordinatesMode =
      BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    // Render
    engine.runRenderLoop(() => {
      scene.render();
    });

    scene.executeWhenReady(this.endLoading());
  }

  endLoading = () => {
    this.setState({
      loading: false,
    });
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

export default SkyBox