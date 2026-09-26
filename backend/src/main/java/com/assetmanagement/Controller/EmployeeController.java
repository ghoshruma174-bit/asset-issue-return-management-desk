package com.assetmanagement.Controller;

import com.assetmanagement.Entity.Employee;
import com.assetmanagement.Service.EmployeeService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // =========================
    // Create Employee
    // =========================
    @PostMapping
    public ResponseEntity<Employee> createEmployee(
            @RequestBody Employee employee) {

        return ResponseEntity.ok(
                employeeService.createEmployee(employee)
        );
    }

    // =========================
    // Get all Employees
    // =========================
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {

        return ResponseEntity.ok(
                employeeService.getAllEmployees()
        );
    }

    // =========================
    // Get Employee by ID
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(
            @PathVariable Long id) {

        return employeeService.getEmployeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // =========================
    // Get Employee by Email
    // =========================
    @GetMapping("/email/{email}")
    public ResponseEntity<Employee> getEmployeeByEmail(
            @PathVariable String email) {

        return employeeService.getEmployeeByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // =========================
    // Update Employee
    // =========================
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee employee) {

        return ResponseEntity.ok(
                employeeService.updateEmployee(id, employee)
        );
    }

    // =========================
    // Delete Employee
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return ResponseEntity.noContent().build();
    }
}
