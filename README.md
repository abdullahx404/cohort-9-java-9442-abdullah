# Contact Management System

A web-based Contact Management System built with Spring Boot (Java) and React.js.

## Tech Stack
- **Backend:** Java 17, Spring Boot, Spring Data JPA, Hibernate, Spring Security, SLF4J / Logback, JUnit 5, Mockito
- **Frontend:** React.js, Vite, React Router
- **Database:** H2 Database (in-memory for development/testing), MS SQL Server support configured

---

## Logins & Authentication
There are **no hardcoded credentials**. The system implements self-registration:
1. Open the application in your browser.
2. Click **"Need an account? Register"** on the login screen.
3. Register using any email or phone number (e.g., `john@example.com` or `+1234567890`) and a password.
4. Log in with the registered credentials.
5. All contacts created are private to the logged-in user.

---

## How to Run the Application

### 1. Run the Backend (Spring Boot)
Ensure Java 17 is available.
```powershell
cd backend
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;" + $env:PATH
.\mvnw.cmd spring-boot:run
```
- Backend runs on: `http://localhost:8080`
- H2 Console (optional): `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:contactdb`
  - User Name: `sa`
  - Password: *(empty)*

### 2. Run the Frontend (React.js)
```powershell
cd frontend
npm install
node node_modules/vite/bin/vite.js
```
*(Note: Direct invocation via `node node_modules/vite/bin/vite.js` avoids Windows shell path issues with folder names containing ampersands).*

- Frontend runs on: `http://localhost:5173`

---

## How to Test

### Automated Tests (Backend)
Run unit tests for controllers, services, repositories, and authentication:
```powershell
cd backend
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;" + $env:PATH
.\mvnw.cmd test
```

### Manual Testing Flow
1. Open `http://localhost:5173`.
2. Register a new user using an email or phone number.
3. Log in with the registered credentials.
4. **Create Contact:** Click "Create Contact" to open the creation modal. Fill in First Name, Last Name, Title, and add one or more labeled email addresses and phone numbers.
5. **View Contact:** Click "View" on any contact row to inspect detailed profile fields.
6. **Search / Filter:** Type a first or last name in the search input to filter contacts dynamically.
7. **Update Contact:** Click "Update" to modify details and save.
8. **Delete Contact:** Click "Delete", then confirm in the confirmation modal.
9. **Change Password:** In the User Profile section on the right, click "Change Password", enter current and new passwords, and submit.
10. **Logout:** Click "Logout" to clear the session.

---

## SonarQube Code Quality Scan
To run a SonarQube scan (requires running SonarQube instance):
```powershell
cd backend
.\mvnw.cmd sonar:sonar
```
Or run `sonar-scanner` from the project root using `sonar-project.properties`.