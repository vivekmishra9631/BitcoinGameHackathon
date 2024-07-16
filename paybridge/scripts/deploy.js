async function main() {
  const [deployer] = await ethers.getSigners();

  //Deploying PayBridgeManager contract with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
//PayBridgeManager contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3

  console.log("Deploying PayBridgeManager contract with the account:", deployer.address);

  const PayBridgeManager = await ethers.getContractFactory("PayBridgeManager");
  const payBridgeManager = await PayBridgeManager.deploy();

  console.log("PayBridgeManager contract deployed to:", payBridgeManager.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });