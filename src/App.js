import { Route, Routes } from 'react-router-dom';

import './App.scss';

import Header from './components/header';
import Home from './components/home';
import PointCloud from './components/pointCloud';

function App() {
  return (
    <div className='container'>
      <Header />
      <Routes>
        <Route exact path='/' component={Home} />
        <Route path='/pool-124733' component={PointCloud} />
      </Routes>
      <Home />
    </div>
  );
}

export default App;
