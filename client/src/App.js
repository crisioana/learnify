import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Alert from './components/global/Alert'
import PageRender from './utils/PageRender'

const App = () => {
  return (
    <Router>
      <Alert />
      <Routes>
        <Route path='/:page' element={<PageRender />} />
        <Route path='/:page/:id' element={<PageRender />} />
      </Routes>
    </Router>
  )
}

export default App