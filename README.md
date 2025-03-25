
# How to Run  

## With Docker  

First of all, if you don't have Docker installed, you can download and install it using the following link:  
🔗 [Download Docker](https://www.docker.com/get-started/)  

If you already have Docker installed on your computer, follow these steps:  

1. Clone the repository and checkout to branch:  
   ```bash
   git clone https://github.com/igoryaro/MB_test.git
   cd MB_test
   git checkout feat/test_MB
   ```
2. Open the terminal at the project root and run the following command:  
   ```bash
   docker compose up --build
   ```
3. The applications will be available at:  
   - **Frontend:** [http://localhost:3001/](http://localhost:3001/)  
   - **Backend:** [http://localhost:3000/registration](http://localhost:3000/registration)  

## With NPM  

1. Clone the repository:  
   ```bash
   git clone https://github.com/igoryaro/MB_test.git
   cd MB_test
   git checkout feat/test_MB
   ```
2. Open the terminal at the project root.  
3. Start the backend:  
   ```bash
   cd backend  
   npm install  
   node server.js  
   ```
4. Start the frontend:  
   ```bash
   cd frontend  
   npm install  
   npm run dev  
   ```
4. The applications will be available at:  
   - **Frontend:** [http://localhost:3001/](http://localhost:3001/)  
   - **Backend:** [http://localhost:3000/registration](http://localhost:3000/registration)  

---

## User Instructions  

- The user must fill in the required fields and click **"Continue"** until reaching the final step.  
- In the last step, they will have the opportunity to **edit** previously entered information before confirming the registration.  
- When the registration is **successful**, the user will see a confirmation screen with the option to **register a new user**.  
- By clicking **"Register New User"**, they will be redirected back to **Step 1** to start a new registration.  

### Testing an Exception Case  

To test a **backend error**, enter the following CPF:  
📌 **123.456.789-10**  
This will trigger an error response during registration.  
