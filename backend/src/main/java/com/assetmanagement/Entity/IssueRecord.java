package com.assetmanagement.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "issue_records")
public class IssueRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;

    private Long assetId;

    private String employeeName;

    private String assetName;

    private LocalDate issueDate;

    private String status;

    private LocalDate returnDate;

    private String returnRemarks;

    // Default constructor
    public IssueRecord() {
    }

    // Constructor
    public IssueRecord(
            Long employeeId,
            Long assetId,
            String employeeName,
            String assetName,
            LocalDate issueDate,
            String status) {

        this.employeeId = employeeId;
        this.assetId = assetId;
        this.employeeName = employeeName;
        this.assetName = assetName;
        this.issueDate = issueDate;
        this.status = status;
    }

    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Employee ID
    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    // Asset ID
    public Long getAssetId() {
        return assetId;
    }

    public void setAssetId(Long assetId) {
        this.assetId = assetId;
    }

    // Employee Name
    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    // Asset Name
    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    // Issue Date
    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    // Status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Return Date
    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    // Return Remarks
    public String getReturnRemarks() {
        return returnRemarks;
    }

    public void setReturnRemarks(String returnRemarks) {
        this.returnRemarks = returnRemarks;
    }
}
