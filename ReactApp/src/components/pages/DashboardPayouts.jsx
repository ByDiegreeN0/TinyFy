import React, { useEffect, useState } from "react"; // Importación de hooks necesarios: useEffect para efectos secundarios y useState para manejar el estado.
import { useNavigate } from "react-router-dom"; // useNavigate para redirigir al usuario a otras rutas.
import "../styles/stylesPages/DashboardPayouts.css"; // Importación de estilos específicos.
import axios from "axios"; // Importación de axios para realizar solicitudes HTTP.

export default function DashboardPayouts() {
  const navigate = useNavigate(); // Hook de React Router para navegar entre rutas.
  const [paymentMethod, setPaymentMethod] = useState("paypal"); // Estado para manejar el método de pago seleccionado.
  const [editMode, setEditMode] = useState(false); // Estado para activar o desactivar el modo de edición.
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar si la página está cargando datos.
  const [payoutData, setPayoutData] = useState([]); // Estado para almacenar los datos del payout.

  const url = "http://localhost:8000/payout_data"; // URL del endpoint del backend donde se obtienen los datos.

  // Función para obtener los datos de payout desde el backend.
  const fetchPayoutData = async () => {
    setIsLoading(true); // Activa el estado de carga.

    try {
      const response = await fetch(url); // Realiza la petición GET al backend.

      if (response.ok) { // Verifica si la respuesta fue exitosa.
        const data = await response.json(); // Convierte la respuesta a JSON.
        setPayoutData(data); // Almacena los datos obtenidos en el estado.
      } else {
        console.error("Error fetching Payout Data"); // Muestra un error en caso de que la respuesta no sea exitosa.
      }
    } catch (err) {
      console.error("Error:", err); // Muestra un error si ocurre alguna excepción.
    } finally {
      setIsLoading(false); // Finaliza el estado de carga, sea éxito o fallo.
    }
  };

  // Función para realizar una solicitud POST al backend con los datos del payout.
  const Payoutspost = async () => {
    // Variables con los valores a enviar en el POST.
    const name = "";
    const email = "";
    const method = paymentMethod;
    const country = "";
    const city = "";
    const zipcode = "";
    const address = "";
    const address2 = "";
    const phonePrefix = "";
    const phoneNumber = "";
    const CreatedAt = new Date().toISOString(); // Fecha actual en formato ISO.

    // Objeto con los datos a enviar en la solicitud POST.
    const newPayoutData = {
      Name: name,
      Email: email,
      Method: method,
      Country: country,
      City: city,
      ZipCode: zipcode,
      Address: address,
      Address2: address2,
      PhonePrefix: phonePrefix,
      PhoneNumber: phoneNumber,
      CreatedAt: CreatedAt,
    };

    try {
      const response = await axios.post(url, newPayoutData, {
        headers: {
          "Content-Type": "application/json", // Define el tipo de contenido como JSON.
        },
      });

      if (response.status === 201) { // Verifica si la respuesta fue exitosa.
        console.log("Payout data posted successfully");
        // Puedes actualizar la tabla o realizar alguna acción adicional aquí.
      } else {
        console.error("Error posting Payout Data"); // Error si el status no es el esperado.
      }
    } catch (error) {
      console.error("Error:", error); // Muestra un error si algo falla en la solicitud.
    }
  };

  // useEffect para redirigir al usuario si no está autenticado.
  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("isAuthenticated") || // Verifica si hay autenticación en el localStorage.
      sessionStorage.getItem("isAuthenticated"); // También verifica en el sessionStorage.
    
    if (!isAuthenticated) {
      navigate("/Signin"); // Si no está autenticado, redirige a la página de inicio de sesión.
    } else {
      fetchPayoutData(); // Si está autenticado, obtiene los datos de payout.
    }
  }, [navigate]); // El efecto se ejecuta cuando cambia `navigate`.

  // Simulación de historial de pagos.
  const paymentHistory = [
    {
      id: "001",
      requestedAt: "2023-06-01",
      doneAt: "2023-06-03",
      amount: "$500",
    },
    {
      id: "002",
      requestedAt: "2023-06-15",
      doneAt: "2023-06-17",
      amount: "$750",
    },
    // Puedes agregar más elementos al historial de pagos.
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Payouts</h1>

        {/* Botones para seleccionar el método de pago */}
        <div className="payment-options">
          <button
            className={`payment-option ${
              paymentMethod === "paypal" ? "active" : "" // Clase "active" si el método seleccionado es PayPal.
            }`}
            onClick={() => setPaymentMethod("paypal")} // Cambia el método a PayPal.
          >
            PayPal
          </button>
          <button
            className={`payment-option ${
              paymentMethod === "pse" ? "active" : "" // Clase "active" si el método seleccionado es PSE.
            }`}
            onClick={() => setPaymentMethod("pse")} // Cambia el método a PSE.
          >
            PSE
          </button>
        </div>

        {/* Formulario para editar información de pago */}
        <form className="payout-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="paypalEmail">Paypal Email</label>
              <input
                type="email"
                id="paypalEmail"
                name="paypalEmail"
                placeholder="Please enter"
                disabled={!editMode} // Deshabilitado si no está en modo de edición.
              />
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Full Names</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Please enter"
                disabled={!editMode} // Deshabilitado si no está en modo de edición.
              />
            </div>
            <div className="form-group">
              <label htmlFor="prefix">Prefix</label>
              <input
                type="text"
                id="prefix"
                name="prefix"
                placeholder="Please enter"
                disabled={!editMode} // Deshabilitado si no está en modo de edición.
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Please enter"
              disabled={!editMode} // Deshabilitado si no está en modo de edición.
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Please enter"
              disabled={!editMode} // Deshabilitado si no está en modo de edición.
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Please enter"
                disabled={!editMode} // Deshabilitado si no está en modo de edición.
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Please enter"
                disabled={!editMode} // Deshabilitado si no está en modo de edición.
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="Please enter"
                disabled={!editMode} // Deshabilitado si no está en modo de edición.
              />
            </div>
          </div>
          {/* Mostrar el campo "Bank" si el método de pago seleccionado es PSE */}
          {paymentMethod === "pse" && (
            <div className="form-group">
              <label htmlFor="bank">Bank</label>
              <select id="bank" name="bank" disabled={!editMode}>
                <option value="">Select your bank</option>
                <option value="bancolombia">Bancolombia</option>
                <option value="davivienda">Davivienda</option>
                <option value="bbva">BBVA</option>
              </select>
            </div>
          )}
          {/* Botón para habilitar o deshabilitar el modo de edición */}
          <button
            type="button"
            className="edit-button"
            onClick={() => setEditMode(!editMode)} // Alterna entre el modo de edición y el modo normal.
          >
            {editMode ? "Save Information" : "Edit Information"} // Muestra el texto adecuado dependiendo del modo.
          </button>
        </form>

        {/* Tabla de historial de pagos */}
        <div className="payment-history">
          <h2>Payment History</h2>
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Payment Requested at</th>
                <th>Payment Done at</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.requestedAt}</td>
                  <td>{payment.doneAt}</td>
                  <td>{payment.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
