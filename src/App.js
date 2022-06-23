import logo from './Assets/logo.svg';
import './styles.scss'

function App() {
  return (
    <div className="bg-slate-200">
      <header className="App-header">
        <div className='flex justify-center items-center flex-col mb-5'>
          <img src={logo} className="mb-3" width={250} alt="logo" />
          <p className='text__role text-slate-600 uppercase font-regular'>Designer | Developer | Photographer</p>
        </div>
        <h3 className='text-slate-900'>
          Website in development
        </h3>
        <h4 className='text-slate-900 text__email font-medium'>
          For enquiries please email hello@imadkazi.co.uk
        </h4>
        
      </header>
    </div>
  );
}

export default App;
