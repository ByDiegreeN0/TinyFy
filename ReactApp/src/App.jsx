import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SignIn from "./components/pages/Signin";
import SignUp from "./components/pages/Signup";
import Header from "./components/layouts/Header";
import HomePage from "./components/pages/HomePage";
import DashboardLinks from "./components/pages/DashboardLinks";
import DashboardEstadisticas from "./components/pages/DashboardEstadisticas";
import DashboardReferrals from "./components/pages/DashboardReferrals";
import DashboardPayouts from "./components/pages/DashboardPayouts";
import DashboardSupport from "./components/pages/DashboardSupport";
import PageLoader from "./components/Common/LoadingScreen";
import TerminosYCondiciones from "./components/Common/TerminosCondiciones";
import UserEditForm from "./components/pages/UserEditForm";
import PasswordRecovery from "./components/pages/PasswordRecovery";
import logo from "./assets/Svg/Logos/HomeSVG.svg";
import RedirectPage from "./components/pages/RedirectPage";
import "./components/styles/index.css";

const App = () => {
  // Estado para manejar la autenticación del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Estado para manejar si la aplicación está en proceso de carga
  const [isLoading, setIsLoading] = useState(true);

  // Hooks para acceder a la ubicación actual y para navegar entre rutas
  const location = useLocation();
  const navigate = useNavigate();

  // Título y descripción que se usan en la página de inicio
  const title = "TinyFy";
  const description =
    "TinyFy es un acortador de URLs innovador que integra estratégicamente anuncios publicitarios. Permite a los usuarios generar enlaces cortos personalizados que muestran anuncios relevantes antes de redirigir al destino final. Los ingresos por publicidad se comparten con los usuarios, incentivando su uso. Con un enfoque en la seguridad, privacidad y desempeño óptimo, TinyFy facilita la gestión eficiente de enlaces en plataformas digitales.";

  // Efecto para verificar el estado de autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Verifica si el usuario está autenticado usando localStorage o sessionStorage
      const storedAuth =
        localStorage.getItem("isAuthenticated") === "true" ||
        sessionStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(storedAuth);

      // Simula un retardo de carga para mostrar una pantalla de carga (1 segundo)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actualiza el estado de carga
      setIsLoading(false);

      // Redirige al usuario autenticado a la página de dashboard por defecto
      if (storedAuth && location.pathname === "/") {
        navigate("/dashboardlinks");
      }
    };

    checkAuthStatus();
  }, [navigate, location.pathname]);

  // Maneja el inicio de sesión y pregunta si se desea mantener la sesión iniciada
  const handleLogin = () => {
    setIsAuthenticated(true);
    showSessionPrompt();
  };

  // Maneja el registro y pregunta si se desea mantener la sesión iniciada
  const handleRegister = () => {
    setIsAuthenticated(true);
    showSessionPrompt();
  };

  // Maneja el cierre de sesión eliminando la autenticación y redirigiendo al inicio
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  // Pregunta al usuario si desea mantener la sesión abierta y guarda la preferencia
  const showSessionPrompt = () => {
    const keepSession = window.confirm("¿Desea mantener la sesión iniciada?");
    if (keepSession) {
      localStorage.setItem("isAuthenticated", "true");
    } else {
      sessionStorage.setItem("isAuthenticated", "true");
    }
  };

  // Componente que protege rutas autenticadas con pantalla de carga
  const AuthenticatedRoute = ({ children }) => {
    const [isComponentLoading, setIsComponentLoading] = useState(true);

    // Efecto para simular una carga de componente con retardo
    useEffect(() => {
      const loadComponent = async () => {
        setIsComponentLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsComponentLoading(false);
      };

      loadComponent();
    }, []);

    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    if (!isAuthenticated) {
      return <Navigate to="/Signin" />;
    }

    // Muestra una pantalla de carga o el contenido del componente
    return <>{isComponentLoading ? <PageLoader /> : children}</>;
  };

  // Si la aplicación está cargando, muestra la pantalla de carga
  if (isLoading) {
    return <PageLoader />;
  }

  // Configuración de rutas y componentes de la aplicación
  return (
    <>
      {/* Header que cambia dependiendo si el usuario está autenticado */}
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      {/* Definición de rutas utilizando react-router-dom */}
      <Routes>
        {/* Ruta de inicio, redirige a dashboard si el usuario está autenticado */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboardlinks" />
            ) : (
              <HomePage logoSrc={logo} />
            )
          }
        />

        {/* Ruta para inicio de sesión */}
        <Route
          path="/Signin"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboardlinks" />
            ) : (
              <SignIn onLogin={handleLogin} />
            )
          }
        />

        {/* Ruta para registro */}
        <Route
          path="/Signup"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboardlinks" />
            ) : (
              <SignUp onRegister={handleRegister} />
            )
          }
        />

        {/* Ruta para dashboard de enlaces, protegida por autenticación */}
        <Route
          path="/dashboardlinks"
          element={
            <AuthenticatedRoute>
              <DashboardLinks title={title} />
            </AuthenticatedRoute>
          }
        />

        {/* Ruta para estadísticas, protegida por autenticación */}
        <Route
          path="/dashboardestadisticas"
          element={
            <AuthenticatedRoute>
              <DashboardEstadisticas />
            </AuthenticatedRoute>
          }
        />

        {/* Ruta para referidos, protegida por autenticación */}
        <Route
          path="/dashboardreferrals"
          element={
            <AuthenticatedRoute>
              <DashboardReferrals />
            </AuthenticatedRoute>
          }
        />

        {/* Ruta para pagos, protegida por autenticación */}
        <Route
          path="/dashboardpayouts"
          element={
            <AuthenticatedRoute>
              <DashboardPayouts />
            </AuthenticatedRoute>
          }
        />

        {/* Ruta para soporte, protegida por autenticación */}
        <Route
          path="/dashboardsupport"
          element={
            <AuthenticatedRoute>
              <DashboardSupport />
            </AuthenticatedRoute>
          }
        />

        {/* Ruta para editar perfil, protegida por autenticación */}
        <Route
          path="/edit-profile"
          element={
            <AuthenticatedRoute>
              <UserEditForm />
            </AuthenticatedRoute>
          }
        />

        {/* Ruta para recuperación de contraseña */}
        <Route path="/passwordRecovery" element={<PasswordRecovery />} />

        <Route
          path="/redirectpage"
          element={<RedirectPage />}
        />
        {/* Ruta para términos y condiciones */}
        <Route
          path="/TerminosYCondiciones"
          element={<TerminosYCondiciones />}
        />
      </Routes>
    </>
  );
};

export default App;
