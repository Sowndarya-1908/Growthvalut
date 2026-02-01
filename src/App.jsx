import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Courses from "./pages/Courses";
import Projects from "./pages/Projects";
import Portfolio from "./pages/Portfolio";
import Certificates from "./pages/Certificates";
import Goals from "./pages/Goals";

import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route
  path="/home"
  element={
    <ProtectedRoute>
      <Layout>
        <Home />
      </Layout>
    </ProtectedRoute>
  }
/>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/skills"
        element={
          <ProtectedRoute>
            <Layout>
              <Skills />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Layout>
              <Courses />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Layout>
              <Projects />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/portfolio"
        element={
          <ProtectedRoute>
            <Layout>
              <Portfolio />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/certificates"
        element={
          <ProtectedRoute>
            <Layout>
              <Certificates />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/goals"
        element={
          <ProtectedRoute>
            <Layout>
              <Goals />
            </Layout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

/* Layout */
function Layout({ children }) {
  const sidebarWidth = "320px";

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarWidth,
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: sidebarWidth,
          width: "100%",
          minHeight: "100vh",
          background: "#f4f6fb",
        }}
      >
        <Header />
        <div style={{ padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}


export default App;
