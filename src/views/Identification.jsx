import { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import MachIgm from "../components/Card";
import { validateRut } from "rutlib";
import { Link, useNavigate } from "react-router-dom";
import PathConstants from "../Routes/PathConstants";
import axios from "axios";

const Identification = ({ name, lastName, phone, email }) => {
	const [rut, setRut] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleRutChange = (event) => {
		setRut(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.post("http://localhost:8080/user/register", {
				name: name,
				lastName: lastName,
				idDocument: rut,
				phone: phone,
				email: email,
				password: password,
			});

			// Manejar la respuesta del servidor
			console.log("Usuario registrado:", response.data);
			navigate("/home");

		} catch (error) {
			console.error("Error al registrar usuario:", error);
		}

		console.log("rut:", validateRut(rut));
	};
	return (
		<>
			<Container maxWidth="sm" style={{ marginTop: "50px" }}>
				<MachIgm />
				<Typography variant="body1" align="center">
					Necesitamos verificar tu identidad
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						label="RUT"
						value={rut}
						onChange={handleRutChange}
						fullWidth
						margin="normal"
						placeholder="Ingresa tu RUT"
					/>
					{validateRut(rut) ? (
						<Typography style={{ color: "green" }} gutterBottom>
							RUT válido.
						</Typography>
					) : (
						<Typography style={{ color: "red" }} gutterBottom>
							Por favor ingresa un RUT válido.
						</Typography>
					)}
					<TextField
						label="Contraseña"
						value={password}
						onChange={handlePasswordChange}
						fullWidth
						margin="normal"
						placeholder="Ingresa una contraseña segura."
						type="password"
					/>
					<Link to={PathConstants.HOME}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
							disabled={!validateRut(rut)}
						>
							Registrarme
						</Button>
					</Link>
				</form>
			</Container>
		</>
	);
};

export default Identification;
