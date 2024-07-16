const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PayBridge", function () {
  let contract;
  let deployer;
  let employee1;

  beforeEach(async function () {
    [deployer, employee1] = await ethers.getSigners();

    const PayBridgeFactory = await ethers.getContractFactory("PayBridge");
    contract = await PayBridgeFactory.deploy("CompanyX", deployer.address, 1);
    await contract.deployed();
  });

  it("Should deploy the contract with correct company details", async function () {
    const companyCID = await contract.companyCID();
    const companyID = await contract.companyID();
    const admin = await contract.admin();

    expect(companyCID).to.equal("CompanyX");
    expect(companyID).to.equal(1);
    expect(admin).to.equal(deployer.address);
  });

  it("Should add an employee", async function () {
    const tx = await contract.addEmployee(employee1.address);
    await tx.wait();

    const employees = await contract.getEmployees();

    expect(employees.length).to.equal(1);
    expect(employees[0]).to.equal(employee1.address);
  });

  it("Should revert if adding a duplicate employee", async function () {
    await contract.addEmployee(employee1.address);

    await expect(contract.addEmployee(employee1.address)).to.be.revertedWith(
      "Employee already Exists"
    );
  });

  it("Should set employee salary", async function () {
    const salary = 1000;
    await contract.setEmployeeSalary(employee1.address, salary);

    const employeeSalary = await contract.getEmployeeSalary(employee1.address);

    expect(employeeSalary).to.equal(salary);
  });

});
