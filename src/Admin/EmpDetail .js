import React, { useState, useEffect } from "react";

const EmpDetail = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3000/employees");
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchEmployees();
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h2>Employee Details:</h2>
        {employees.map((employee, index) => (
          <div>
            <button onClick={() => toggleAccordion(index)}>
              {employee.name}
            </button>
            {openIndex === index && (
              <div>
                <p>Email: {employee.email}</p>
                <p>Employee ID: {employee.employeeId}</p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default EmpDetail;
