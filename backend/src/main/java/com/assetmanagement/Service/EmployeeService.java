package com.assetmanagement.Service;

import com.assetmanagement.Entity.Employee;
import com.assetmanagement.Repository.EmployeeRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // =========================
    // Create Employee
    // =========================
    public Employee createEmployee(Employee employee) {

        return employeeRepository.save(employee);
    }

    // =========================
    // Get all Employees
    // =========================
    public List<Employee> getAllEmployees() {

        return employeeRepository.findAll();
    }

    // =========================
    // Get Employee by ID
    // =========================
    public Optional<Employee> getEmployeeById(Long id) {

        return employeeRepository.findById(id);
    }

    // =========================
    // Get Employee by Email
    // =========================
    public Optional<Employee> getEmployeeByEmail(String email) {

        return employeeRepository.findByEmail(email);
    }

    // =========================
    // Update Employee
    // =========================
    public Employee updateEmployee(
            Long id,
            Employee updatedEmployee) {

        Employee existingEmployee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Employee not found"));

        existingEmployee.setName(
                updatedEmployee.getName());

        existingEmployee.setEmail(
                updatedEmployee.getEmail());

        existingEmployee.setDepartment(
                updatedEmployee.getDepartment());

        return employeeRepository.save(existingEmployee);
    }

    // =========================
    // Delete Employee
    // =========================
    public void deleteEmployee(Long id) {

        if (!employeeRepository.existsById(id)) {

            throw new RuntimeException(
                    "Employee not found");
        }

        employeeRepository.deleteById(id);
    }
}
