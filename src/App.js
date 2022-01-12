import { Routes, Route } from 'react-router-dom';

import './App.scss';

import Header from './components/header';
import Home from './components/home';
import RenderScene from './components/renderScene';

function App() {
  return (
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='render-scene' element={<RenderScene />} />
      </Routes>
    </div>
  );
}

export default App;
