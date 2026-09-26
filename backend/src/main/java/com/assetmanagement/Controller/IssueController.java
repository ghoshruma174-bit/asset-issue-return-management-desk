package com.assetmanagement.Controller;

import com.assetmanagement.DTO.ReturnRequest;
import com.assetmanagement.Entity.IssueRecord;
import com.assetmanagement.Service.IssueService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:5173")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    // =====================================================
    // GET ALL ISSUE RECORDS
    // =====================================================

    @GetMapping
    public List<IssueRecord> getAllIssues() {
        return issueService.getAllIssues();
    }

    // =====================================================
    // GET MY ISSUES - EMPLOYEE
    // =====================================================

    @GetMapping("/my")
    public List<IssueRecord> getMyIssues(
            Authentication authentication) {

        String email = authentication.getName();

        return issueService.getIssuesByEmployeeEmail(email);
    }

    // =====================================================
    // ISSUE ASSET
    // =====================================================

    @PostMapping
    public IssueRecord issueAsset(
            @RequestParam Long employeeId,
            @RequestParam Long assetId) {

        return issueService.issueAsset(
                employeeId,
                assetId
        );
    }

    // =====================================================
    // RETURN ASSET
    // =====================================================

    @PutMapping("/{id}/return")
    public IssueRecord returnAsset(
            @PathVariable Long id,
            @RequestBody ReturnRequest request) {

        return issueService.returnAsset(
                id,
                request.getRemarks()
        );
    }
}
