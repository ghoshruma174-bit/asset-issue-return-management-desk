package com.assetmanagement.Service;

import com.assetmanagement.Entity.Asset;
import com.assetmanagement.Entity.Employee;
import com.assetmanagement.Entity.IssueRecord;
import com.assetmanagement.Repository.AssetRepository;
import com.assetmanagement.Repository.EmployeeRepository;
import com.assetmanagement.Repository.IssueRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final AssetRepository assetRepository;
    private final EmployeeRepository employeeRepository;

    public IssueService(
            IssueRepository issueRepository,
            AssetRepository assetRepository,
            EmployeeRepository employeeRepository) {

        this.issueRepository = issueRepository;
        this.assetRepository = assetRepository;
        this.employeeRepository = employeeRepository;
    }

    // Get all issue records
    public List<IssueRecord> getAllIssues() {
        return issueRepository.findAll();
    }

    // Get issue records by employee ID
    public List<IssueRecord> getIssuesByEmployeeId(Long employeeId) {
        return issueRepository.findByEmployeeId(employeeId);
    }

    // Get issue records for the currently logged-in employee
    public List<IssueRecord> getIssuesByEmployeeEmail(String email) {

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        return issueRepository.findByEmployeeId(employee.getId());
    }

    // Issue an asset to an employee
    public IssueRecord issueAsset(Long employeeId, Long assetId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() ->
                        new RuntimeException("Asset not found"));

        if (!"Available".equalsIgnoreCase(asset.getStatus())) {
            throw new RuntimeException(
                    "Asset is not available for issue"
            );
        }

        // Change asset status
        asset.setStatus("Issued");
        assetRepository.save(asset);

        // Create issue record
        IssueRecord issueRecord = new IssueRecord();

        issueRecord.setEmployeeId(employee.getId());
        issueRecord.setEmployeeName(employee.getName());

        issueRecord.setAssetId(asset.getId());
        issueRecord.setAssetName(asset.getName());

        issueRecord.setIssueDate(LocalDate.now());
        issueRecord.setStatus("Issued");

        return issueRepository.save(issueRecord);
    }

    // Return an issued asset
    public IssueRecord returnAsset(Long issueId, String remarks) {

        IssueRecord issueRecord = issueRepository.findById(issueId)
                .orElseThrow(() ->
                        new RuntimeException("Issue record not found"));

        if ("Returned".equalsIgnoreCase(issueRecord.getStatus())) {
            throw new RuntimeException(
                    "This asset has already been returned"
            );
        }

        Asset asset = assetRepository.findById(
                issueRecord.getAssetId()
        ).orElseThrow(() ->
                new RuntimeException("Asset not found"));

        // Make asset available again
        asset.setStatus("Available");
        assetRepository.save(asset);

        // Update issue record
        issueRecord.setStatus("Returned");
        issueRecord.setReturnDate(LocalDate.now());

        issueRecord.setReturnRemarks(
                remarks == null ? "" : remarks.trim()
        );

        return issueRepository.save(issueRecord);
    }
}
