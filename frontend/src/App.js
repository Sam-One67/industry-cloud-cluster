import React, { useState, useEffect } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  // The API URL will be handled by K8s Ingress/Service
  const API_URL = '/api/employees';

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      }
    } catch (error) {
      console.error("Error connecting to Backend:", error);
    }
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, position }),
      });
      setName('');
      setPosition('');
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Enterprise Employee Portal</h1>
      <form onSubmit={addEmployee}>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Employee Name" 
          required 
          style={{ margin: '5px', padding: '8px' }}
        />
        <input 
          value={position} 
          onChange={(e) => setPosition(e.target.value)} 
          placeholder="Position" 
          required 
          style={{ margin: '5px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>Add Employee</button>
      </form>
      <hr />
      <h3>Employee Records:</h3>
      <ul>
        {employees.map((emp, index) => (
          <li key={index}><strong>{emp.name}</strong> - {emp.position}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;