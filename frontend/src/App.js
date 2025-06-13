import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

// Base server URL from environment variable + endpoint
const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}`;

function App() {
    const [employees, setEmployees] = useState([]);
    const [employeeDetails, setEmployeeDetails] = useState({ name: '', employeeId: 0 });

    async function fetchEmployees() {
        try {
            const response = await axios.get(SERVER_URL);
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    }

    async function createEmployee() {
        try {
            await axios.post(SERVER_URL, {
                name: employeeDetails.name,
                employee_id: parseInt(employeeDetails.employeeId)
            });
            await fetchEmployees();
            setEmployeeDetails({ name: '', employeeId: 0 });
        } catch (error) {
            console.log(`Error adding employee: ${JSON.stringify(error)}`);
        }
    }

    const handleSetName = (e) => {
        setEmployeeDetails({ ...employeeDetails, name: e.target.value });
    };

    const handleSetEmployeeId = (e) => {
        setEmployeeDetails({ ...employeeDetails, employeeId: e.target.value });
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <>
            <div className="App" style={{
                paddingTop: "50px",
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem calc(100vh - 50rem)",
            }}>
                <TextField id="standard-basic" label="Name" variant="standard" onChange={handleSetName} value={employeeDetails.name} />
                <TextField id="standard-number" label="Id"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    onChange={handleSetEmployeeId}
                    value={employeeDetails.employeeId}
                />
                <Button variant="contained" onClick={createEmployee}>Add Employees</Button>
            </div>
            <TableContainer component={Paper} style={{
                display: "flex",
                alignItems: "center",
                paddingTop: "2rem",
                justifyContent: "center",
            }}>
                <Table sx={{ maxWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Employee Name</TableCell>
                            <TableCell align="right">Employee Id</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {employee.name}
                                </TableCell>
                                <TableCell align="right">{employee.employee_id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default App;
