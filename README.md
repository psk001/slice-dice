
````markdown
# Slicedice Node.js Express App

This is a Node.js Express application for managing employee data and providing summary statistics.

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
cd slicedice
```
````

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following:

```env
SECRET_KEY=your_secret_key
PORT=3000
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

The app will be running at `http://localhost:3000`.

## API Endpoints

### Employee Routes

#### Get All Employees

```bash
curl -X GET http://localhost:3000/employee -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

#### Add Employee

```bash
curl -X POST http://localhost:3000/employee -H "Authorization: Bearer <YOUR_JWT_TOKEN>" -H "Content-Type: application/json" -d '{"name": "John Doe", "salary": "50000", "currency": "USD", "department": "Engineering", "sub_department": "Platform"}'
```

#### Delete Employee

```bash
curl -X DELETE http://localhost:3000/employee -H "Authorization: Bearer <YOUR_JWT_TOKEN>" -d 'employeeName=John Doe'
```

### Summary Statistics Routes

#### Get All Summary Statistics

```bash
curl -X GET http://localhost:3000/summary-statistics -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

#### Get Summary Statistics for Employees on Contract

```bash
curl -X GET http://localhost:3000/summary-statistics/on-contract -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

#### Get Summary Statistics by Department

```bash
curl -X GET http://localhost:3000/summary-statistics/department -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

#### Get Summary Statistics by Department and Sub-Department

```bash
curl -X GET http://localhost:3000/summary-statistics/dept-sub-dept -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

### Login Mechanism

#### Login and Get JWT Token

```bash
curl -X POST http://localhost:3000/employee/login -H "Content-Type: application/json" -d '{"username": "your_username", "password": "your_password"}'
```

Replace `your_username` and `your_password` with your actual credentials.

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
   curl -X GET http://localhost:3000/employee -H "Authorization: Bearer <TEST_JWT_TOKEN>"
   ```

2. **Add Employee:**

   - Ensure the endpoint adds a new employee successfully.
   - Use a test JWT token.

   ```bash
   # Test Command
   curl -X POST http://localhost:3000/employee -H "Authorization: Bearer <TEST_JWT_TOKEN>" -H "Content-Type: application/json" -d '{"name": "Test Employee", "salary": "60000", "currency": "USD", "department": "Test Department", "sub_department": "Test Sub-Department"}'
   ```

3. **Delete Employee:**

   - Ensure the endpoint deletes an employee successfully.
   - Use a test JWT token.

   ```bash
   # Test Command
   curl -X DELETE http://localhost:3000/employee -H "Authorization: Bearer <TEST_JWT_TOKEN>" -d 'employeeName=Test Employee'
   ```

4. **Login and Get JWT Token:**

   - Ensure the login endpoint returns a valid JWT token.
   - Use test credentials.

   ```bash
   # Test Command
   curl -X POST http://localhost:3000/employee/login -H "Content-Type: application/json" -d '{"username": "test_user", "password": "test_password"}'
   ```

```

Remember to replace placeholders like `<TEST_JWT_TOKEN>`, `<repository_url>`, `<YOUR_JWT_TOKEN>`, `<YOUR_USERNAME>`, `<YOUR_PASSWORD>`, and `<your_secret_key>` with your actual values. This is just a template, and you may need to adjust it based on your application structure and specific requirements.
```
