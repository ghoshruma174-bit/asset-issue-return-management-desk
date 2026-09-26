package com.assetmanagement.DTO;

import com.assetmanagement.Entity.User;

import java.time.LocalDate;

public class UserResponse {

    private Long id;
    private String userId;
    private String fullName;
    private String email;
    private String gender;
    private String role;
    private LocalDate dateOfBirth;
    private Integer age;
    private String designation;

    public UserResponse(User user) {
        this.id = user.getId();
        this.userId = user.getUserId();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.gender = user.getGender();
        this.role = user.getRole();
        this.dateOfBirth = user.getDateOfBirth();
        this.age = user.getAge();
        this.designation = user.getDesignation();
    }

    public Long getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getGender() {
        return gender;
    }

    public String getRole() {
        return role;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public Integer getAge() {
        return age;
    }

    public String getDesignation() {
        return designation;
    }
}
