import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import Login from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import Signup from "./pages/SignupPage"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
