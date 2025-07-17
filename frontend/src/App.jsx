import './App.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';


function App() {

  return (
    <>
      <Layout>
        <NewOrder />
      </Layout>
    </>
  )
}

export default App
