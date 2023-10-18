```markdown
# Slicedice Node.js Express App

This is a Node.js Express application for managing employee data and providing summary statistics.

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
cd slicedice
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following:

```env
SECRET_KEY=your_secret_key
PORT=5000
```

Replace `your_secret_key` with your actual secret key.

## Running the App

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The app will be running at `http://localhost:5000`.

## API Endpoints

### Login Mechanism

#### Login and Get JWT Token

```bash
curl -X POST http://localhost:5000/employee/login -H "Content-Type: application/json" -d '{"username": "your_username", "password": "your_password"}'
```

Replace `your_username` and `your_password` with your actual credentials.


### Employee Routes

#### Get All Employees

```bash
curl -X GET http://localhost:5000/employee -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

#### Add Employee

```bash
curl -X POST http://localhost:5000/employee -H "Authorization: Bearer <YOUR_JWT_TOKEN>" -H "Content-Type: application/json" -d '{"name": "John Doe", "salary": "50000", "currency": "USD", "department": "Engineering", "sub_department": "Platform"}'
```

#### Delete Employee

```bash
curl -X DELETE http://localhost:5000/employee -H "Authorization: Bearer <YOUR_JWT_TOKEN>" -d 'employeeName=John Doe'
```

### Summary Statistics Routes

#### Get All Summary Statistics

```bash
curl -X GET http://localhost:5000/summary-statistics -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

#### Get Summary Statistics for Employees on Contract

```bash
curl -X GET http://localhost:5000/summary-statistics/on-contract -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

#### Get Summary Statistics by Department

```bash
curl -X GET http://localhost:5000/summary-statistics/department -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

#### Get Summary Statistics by Department and Sub-Department

```bash
curl -X GET http://localhost:5000/summary-statistics/dept-sub-dept -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

## Testing

To run tests, use the following command:

```bash
npm test
```

### Test Cases

1. **Get All Employees:**

   - Ensure the endpoint returns a list of all employees.
   - Use a test JWT token.

   ```bash
   # Test Command
   curl -X GET http://localhost:5000/employee -H "Authorization: Bearer <TEST_JWT_TOKEN>"
   ```

2. **Add Employee:**

   - Ensure the endpoint adds a new employee successfully.
   - Use a test JWT token.

   ```bash
   # Test Command
   curl -X POST http://localhost:5000/employee -H "Authorization: Bearer <TEST_JWT_TOKEN>" -H "Content-Type: application/json" -d '{"name": "Test Employee", "salary": "60000", "currency": "USD", "department": "Test Department", "sub_department": "Test Sub-Department"}'
   ```

3. **Delete Employee:**

   - Ensure the endpoint deletes an employee successfully.
   - Use a test JWT token.

   ```bash
   # Test Command
   curl -X DELETE http://localhost:5000/employee -H "Authorization: Bearer <TEST_JWT_TOKEN>" -d 'employeeName=Test Employee'
   ```

4. **Get All Summary Statistics:**

   - Ensure the endpoint returns summary statistics for all departments.
   - Use a test JWT token.

   ```bash
   # Test Command
   curl -X GET http://localhost:5000/summary-statistics -H "Authorization: Bearer <TEST_JWT_TOKEN>"
   ```

5. **Get Summary Statistics for Employees on Contract:**

   - Ensure the endpoint returns summary statistics for employees on contract.
   - Use a test JWT token.

   ```bash
   # Test Command
   curl -X GET http://localhost:5000/summary-statistics/on-contract -H "Authorization: Bearer <TEST_JWT_TOKEN>"
   ```

6. **Get Summary Statistics by Department:**

   - Ensure the endpoint returns summary statistics for each department.
   - Use a test JWT token.

   ```bash
   # Test Command
   curl -X GET http://localhost:5000/summary-statistics/department -H "Authorization: Bearer <TEST_JWT_TOKEN>"
   ```

7. **Get Summary Statistics by Department and Sub-Department:**

   - Ensure the endpoint returns summary statistics for each department and sub-department combination.
   - Use a test JWT token.

   ```bash
   # Test Command
   curl -X GET http://localhost:5000/summary-statistics/dept-sub-dept -H "Authorization: Bearer <TEST_JWT_TOKEN>"
   ```
