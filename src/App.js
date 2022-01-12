import { Routes, Route } from 'react-router-dom';

import './App.scss';

import Header from './components/header';
import Home from './components/home';
import RenderScene from './components/renderScene';
import SkyBox from './components/skyBox';

function App() {
  return (
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='render-scene' element={<RenderScene />} />
        <Route path='sky-box' element={<SkyBox />} />
      </Routes>
    </div>
  );
}

export default App;
