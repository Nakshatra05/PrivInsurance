# **PrivInsure**

**PrivInsure** is a privacy-preserving application that leverages Multi-Party Computation (MPC) to allow individuals to determine their eligibility for insurance policies without revealing their personal health data or the insurer's policy requirements. Using cutting-edge cryptographic techniques, **PrivInsure** ensures that both parties can securely compute the eligibility criteria while maintaining full confidentiality.

---

## **Features**

- **Privacy-Preserving Eligibility Check**: Users can check if they qualify for an insurance policy without revealing sensitive personal health data.
- **Secure Two-Party Computation (2PC)**: Utilizes Multi-Party Computation (MPC) to allow data processing without compromising user or insurer privacy.
- **Real-Time Results**: Receive immediate eligibility feedback after a secure computation, without any data leakage.
- **Easy Integration**: The application provides a simple interface for users and insurers to securely share necessary encrypted information.

---

## **How It Works**

1. **User Input**: The user submits their encrypted health data (e.g., age, BMI, health history).
2. **Insurer Input**: The insurer provides encrypted policy requirements (e.g., age limits, BMI thresholds).
3. **Secure Computation**: The application uses the **Trinity MPC scheme** to securely compute whether the user is eligible for the policy based on the provided criteria.
4. **Eligibility Result**: Both parties receive the result (eligible or not) without exposing any sensitive data.

---

## **Technologies Used**

- **Typescript**: For the core application logic and front-end development.
- **MPC Framework**: A library for building secure multi-party computations.
- **Trinity MPC Scheme**: A secure and efficient MPC protocol developed by Cursive.
- **Cryptographic Primitives**: Includes Oblivious Transfer (OT) and Garbled Circuits for secure, privacy-preserving computation.

---

## **Getting Started**

Follow the steps below to set up and run **PrivInsure** locally.

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- Typescript
- MPC Framework

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nakshatra05/PrivInsure.git
   cd PrivInsure
   ```

2. Install the required dependencies for frontend:

   ```bash
   cd client-frontend
   npm install
   # or
   yarn install
   cd ..
   ```

3. Install the required dependencies for backend:

   ```bash
   cd socket_server
   npm install
   # or
   yarn install
   cd ..
   ```

4. Run the backend in one terminal:

   ```bash
   cd socket_server
   node server.js
   ```

5. Run the frontend in another terminal:

   ```bash
   cd client-frontend
   npm run dev
   #or
   yarn dev  
   ```


   This will start a local development server at `http://localhost:3000`.

---

## **Usage**

1. **User Side**:
   - Enter your encrypted health data (e.g., age, BMI) in the provided input fields.
   - Submit the data to initiate the eligibility check.

2. **Insurer Side**:
   - Input the encrypted policy requirements.
   - Securely process the eligibility query using the MPC protocol.

3. **Result**:
   - Both the user and the insurer will receive a result indicating whether the user is eligible for the insurance policy.

---

## **Contributing**

We welcome contributions to **PrivInsure**! If you want to improve the application, feel free to fork the repository, create a branch, and submit a pull request.

To contribute, please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-xyz`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-xyz`)
5. Open a pull request

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Acknowledgements**

- Thanks to the developers of the **mpc-framework** and **Trinity MPC scheme** for their innovative work in privacy-preserving computation.
- Special thanks to the open-source cryptography community for enabling secure data sharing and privacy.
