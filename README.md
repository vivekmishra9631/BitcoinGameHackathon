# PayBridge - Decentralized Payroll Platform

![PayBridge](public/paybridge_logo.jpg)

## Live App

[PayBridge](https://pay-bridge-bitcoin-games.vercel.app/)

## Overview

A decentralized payroll platform that enables businesses to seamlessly make monthly payments to their employees. With PayBridge, companies can manage their payroll more efficiently, while employees enjoy the convenience of accessing their salaries through a user-friendly interface.

### Team Members

- [Vivek Mishra](https://github.com/vivekmishra9631)
- [Mohamed Farhun](https://github.com/MohamedFarhun)

## Features

- **Easy Registration:** Companies can easily register on PayBridge and set up their payroll system within minutes.

- **Seamless Payroll Management:** Employers can add employees to the payroll and initiate payments effortlessly.

- **Instant Salary Access:** Employees can access their salaries instantly through their PayBridge wallet.

- **Withdrawal Options:** Employees can choose to withdraw their salaries to their connected wallets with ease.

- **Staking for Interests:** PayBridge allows employees to stake their funds to earn interests, providing them with additional income opportunities.

- **Loan Management**: Employees can apply for a loan from their company and repay it through their salary payments.

## Deployed Rootstock Contract Address

-[0xa8979a7102dC8688c458Dec7B868816B0b8FE142](https://explorer.testnet.rootstock.io/address/0xa8979a7102dc8688c458dec7b868816b0b8fe142)

## How It Works

1. **Company Registration:** Companies register on PayBridge and set up their payroll system.

2. **Add Employees:** Employers add their employees to the payroll system.

3. **Initiate Payments:** Companies initiate payments to their employees through PayBridge.

4. **Employee Access:** Employees access their salaries instantly through their PayBridge wallet.

5. **Withdrawal and Staking:** Employees can choose to withdraw their salaries to their connected wallets or stake their funds for interests.

6. **Loan Management:** Employees can apply for a loan from their company and repay it through their salary payments.

## Getting Started (User Guide)

To get started with PayBridge, follow these simple steps:

1. **Register Your Company:** Sign up on PayBridge and register your company.

2. **Add Employees:** Add your employees to the payroll system.

3. **Initiate Payments:** Easily initiate payments to your employees each month.

4. **Employee Access:** Employees can access their salaries instantly through PayBridge.

5. **Withdrawal and Staking:** Employees can choose to withdraw their salaries to their connected wallets or stake their funds for interests.

6. **Loan Management:** Employees can apply for a loan from your company and repay it through their salary payments.

## Technical Documentation

## Deployed Rootstock Contract Address

-[0xd4dC198462fDF966C3ED0c75817294Ade298AB5E](https://explorer.testnet.rootstock.io/address/0xd4dc198462fdf966c3ed0c75817294ade298ab5e)

### Prerequisite Installation Guide

Before getting started, ensure you have the following installed:

1. Clone the repository to your local machine:

   ```sh
   git clone https://github.com/vivekmishra9631/PayBridge.git
   cd PayBridge
   ```

2. Install Node.js dependencies for frontend and smart contracts:

   ```sh
   npm install
   cd smart-contract
   npm install
   ```

3. Fix vulnerabilities for frontend and smart contracts:

   ```sh
   npm audit fix
   npm audit
   cd smart-contract
   npm audit fix
   npm audit
   ```

4. Set up environment variables for frontend:

   ```sh
   # Ensure your .env file is correctly set up in the root directory
   touch .env
   ```

5. Create and activate a virtual environment:

   ```sh
   python3 -m venv venv

   # On Windows
   venv\Scripts\activate

   # On macOS/Linux
   source venv/bin/activate
   ```

6. If there is no requirements.txt, create one:

   ```sh
   pip freeze > requirements.txt
   ```

7. Install Python dependencies:

   ```sh
   pip install -r requirements.txt
   ```

8. Compile and build smart contracts:

   ```sh
   cd smart-contract
   npx hardhat compile
   ```

9. Start the frontend server:

   ```sh
   npm run dev
   ```

10. Open your web browser and go to: [http://localhost:3000](http://localhost:3000)

11. Start the backend server on port 5000:
    ```sh
    npm run start:server
    ```

## License

PayBridge is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the codebase in accordance with the terms of the license.

## Thank you for exploring our project!
