import Dashboard from './screens/dashboard';
import Login from "./screens/login";
import ProtectedRoute from './auth/productedRoute';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";




function App() {
 
  return (
    <>
      
      <Router>
      <Routes>
       
       <Route path="/" element={<Login/>} />


       <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
       
          
      </Routes>
     
    </Router>
    
    
    </>
    
  );
}

export default App;
