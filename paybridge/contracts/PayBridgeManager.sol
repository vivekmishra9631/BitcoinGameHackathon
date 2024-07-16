// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./PayBridge.sol";

contract PayBridgeManager {

  struct Company {
    uint256 id;
    string name;
    string description;
    PayBridge payBridgeContract;
  }

  Company[] public companies; // Array of registered companies
  mapping(string => bool) public companyNameExists; // Track existing company names

  event CompanyRegistered(uint256 id, string name, address companyAddress);

  // Function to register a new company
  function registerCompany(string memory name, string memory description) public {
    require(!companyNameExists[name], "Company name already exists");
    uint256 id = companies.length;
    PayBridge newPayBridgeContract = new PayBridge(msg.sender);
    companies.push(Company({
      id: id,
      name: name,
      description: description,
      payBridgeContract: newPayBridgeContract
    }));
    companyNameExists[name] = true;
    emit CompanyRegistered(id, name, address(newPayBridgeContract));
  }

  // Function to retrieve all registered companies
  function getAllCompanies() public view returns (Company[] memory) {
    return companies;
  }

  // Function to add an employee to a company
  function addEmployeeToCompany(uint256 companyId, address employeeAddress) public {
    require(companyId < companies.length, "Invalid company ID");
    companies[companyId].payBridgeContract.addEmployee(employeeAddress, companyId);
  }
}
