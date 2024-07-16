// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PayBridge {
 
    address admin;

    struct Employee {
        address payable employeeAddress;
        uint256 salary;
        uint256 lastSalaryPaidAt;
        uint256 loanAmount;
        bool loanApproved;
        uint256 companyId;     
    }

    mapping(address => Employee) public employees; // Address => Employee details
    mapping(address => address) public companyOf; // Employee address => Company address
    mapping(address => uint256) public companyEmployeeCount; // Company address => Employee count

    constructor(address _admin){
        admin = _admin;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    event SalarySent(address indexed company, address indexed employee, uint256 amount);
    event SalaryWithdrawn(address indexed employee, uint256 amount);
    event LoanRequested(address indexed employee, uint256 amount);
    event LoanApproved(address indexed company, address indexed employee, uint256 amount);
    event LoanRejected(address indexed company, address indexed employee);
    event EmployeeAdded(address indexed company, address indexed employee);

    function sendSalary(address employeeAddress, uint256 amount)external payable onlyAdmin{
        require(msg.value == amount, "Insufficient funds sent");
        Employee storage employee = employees[employeeAddress];
        require(companyOf[employeeAddress] == msg.sender, "Not authorized to send salary");
        employee.salary = amount;
        employee.lastSalaryPaidAt = block.timestamp;
        emit SalarySent(msg.sender, employeeAddress, amount);
    }

    function withdrawSalary() external {
        Employee storage employee = employees[msg.sender];
        require(employee.salary > 0, "No salary to withdraw");
        uint256 amount = employee.salary;
        employee.salary = 0;
        payable(msg.sender).transfer(amount);
        emit SalaryWithdrawn(msg.sender, amount);
    }

    function requestLoan(uint256 amount) external {
        Employee storage employee = employees[msg.sender];
        require(employee.loanAmount == 0, "Existing loan pending");
        employee.loanAmount = amount;
        emit LoanRequested(msg.sender, amount);
    }

    function approveLoan(address employeeAddress) external onlyAdmin {
        require(companyOf[employeeAddress] == msg.sender, "Not authorized to approve loan");
        Employee storage employee = employees[employeeAddress];
        require(employee.loanAmount > 0, "No pending loan");
        employee.loanApproved = true;
        emit LoanApproved(msg.sender, employeeAddress, employee.loanAmount);
    }

    function rejectLoan(address employeeAddress) external onlyAdmin {
        require(companyOf[employeeAddress] == msg.sender, "Not authorized to reject loan");
        Employee storage employee = employees[employeeAddress];
        require(employee.loanAmount > 0, "No pending loan");
        employee.loanAmount = 0;
        emit LoanRejected(msg.sender, employeeAddress);
    }

    function addEmployee(address employeeAddress, uint256 companyId) external onlyAdmin{
        require(companyOf[employeeAddress] == address(0), "Employee already exists");
        companyOf[employeeAddress] = msg.sender;
        employees[employeeAddress] = Employee({
            employeeAddress: payable(employeeAddress),
            salary: 0,
            lastSalaryPaidAt: 0,
            loanAmount: 0,
            loanApproved: false,
            companyId: companyId
        });
        companyEmployeeCount[msg.sender]++;
        emit EmployeeAdded(msg.sender, employeeAddress);
    }


}
