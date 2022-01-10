import { Routes, Route } from 'react-router-dom';

import './App.scss';

import Header from './components/header';
import Home from './components/home';
import PointCloud from './components/pointCloud';
import WireMesh from './components/wireMesh';

function App() {
  return (
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='cloud-pool-124733' element={<PointCloud />} />
        <Route path='mesh-pool-124733' element={<WireMesh />} />
      </Routes>
    </div>
  );
}

export default App;
