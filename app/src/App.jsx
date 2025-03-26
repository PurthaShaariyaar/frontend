import './App.css';
import MyTabComponent from './components/MyTabComponent';

function App() {
  return (
    <div className='App'>
      <MyTabComponent>
        <div title={'Section 1'}>Content of Section 1</div>
        <div title={'Section 2'}>Content of Section 2</div>
      </MyTabComponent>
    </div>
  );
}

export default App
