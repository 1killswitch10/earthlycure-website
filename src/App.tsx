import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Consultation from './pages/Consultation';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import RecentPosts from './pages/RecentPosts';
import PostView from './pages/PostView';
import HerbDetails from './pages/HerbDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<RecentPosts />} />
            <Route path="/posts/:id" element={<PostView />} />
            <Route path="/herbs/:id" element={<HerbDetails />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;