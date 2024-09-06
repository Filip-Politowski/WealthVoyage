# Wealth Voyage

# Project Description

The primary goal of this project is to simplify the management of personal finances for users.
To achieve this, the application provides a range of features that enable users to track and document income, expenses,
loans, and savings.
To make it easier to monitor the balance between income and expenditures, users have access to various charts and
tables.
Additionally, the application offers a feature to track the exchange rates of three major currencies most commonly used
in our region (EU).
The data is fetched directly from the National Bank of Poland (NBP) database.

The application is built using both backend and frontend technologies.
The backend is developed in Java 17 and Spring Boot 3.2.2, with MySQL as the database.
The frontend is written in TypeScript, React, HTML, and SCSS.
The backend serves as a RESTful application, and the frontend communicates with the relevant endpoints to retrieve data
from the database.
The entire system is secured using Spring Security 6 and JWT tokens.

# Functions

* User Registration and Login
* Automatic Security Token Refresh
* Tracking Savings, Expenses, and Income through Charts
* Currency Conversion (USD, EUR, GBP)
* Data Sorting
* Tracking Recent Transactions
* Monthly Summary of Key Data
* Creating and Tracking Savings Goals
* Monitoring Interest-Free Loans
* Monitoring and Adding Income Sources, Categorized by Type
* Monitoring and Adding Expenses, Categorized by Type
* Creating Planned Expenses in a Checklist Format, with the Ability to Set Priorities and Mark Paid Costs

# Technologies and Tools:

### Backend:

* Java 17
* Spring Boot 3.2.2
* Spring Security 6.2.1 (for handling authentication and authorization)
* Hibernate (for object-relational mapping)
* Lombok
* Maven 3.9.4
* IntelliJ

### Frontend:

* TypeScript 4.9.5
* React 18.2.0 (for build UI)
* scss
* HTML
* Node.js 18.14.1
* NPM
* VS Code

### Data Base:

* MySQL

### Authentication and Security:

* JWT (for authorization and authentication)
* Spring Security 6.2.1

### Others:

* Git
* Postman

# Project Structure:

## Backend:

* Configuration Classes
* Entities
* DTO (Data Transfer Object) Classes
* Spring Data JPA Repositories
* Service Layers
* Controllers
* Mappers
* Scheduled Tasks

## Frontend:

* Components
* Hooks
* Pages
* Services
* Styles
* Utils
* App.ts
* index.ts
* Routes
* Models

## Data Base

![](WealthVoyage-backend-01/images/wealthVoyageDb.png)

# Authentication and Authorization

The API uses authorization via the header with JWT tokens.
Every request to a protected resource must include a properly formatted 'Authorization' header containing the JWT token.
Tokens have a specific expiration time; after it expires, a refresh token, obtained during login, must be sent to the
server to receive a new temporary token.

Example of an 'Authorization' header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

# API Endpoints

The application has only two unsecured endpoints, which are used for registration and login.
These endpoints generate an authorization token that grants access to the application.

* Registration Endpoint ```localhost:8080/api/auth/register```

```JSON
{
  "username": "John2#4",
  "password": "examplePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.Doe.example@gmail.com"
}
```

* Login Endpoint ```localhost:8080/api/auth/authenticate```

```JSON
{
  "username": "John2#4",
  "password": "examplePassword123"
}
```

All other endpoints must have a properly formatted 'Authorization' header for user authentication.

# Examples of project views

![](WealthVoyage-backend-01/images/welcomePage.png)
![](WealthVoyage-backend-01/images/signin.png)
![](WealthVoyage-backend-01/images/dashboard.png)
![](WealthVoyage-backend-01/images/plannedExpense.png)
![](WealthVoyage-backend-01/images/recurringExpenses.png)
![](WealthVoyage-backend-01/images/transactions.png)
![](WealthVoyage-backend-01/images/windowToAddingElements.png)

# Running the Project

## Backend

To run the backend part, ensure that the appropriate `JDK` is installed on your computer.
To check, enter the command `java -version` in the terminal. If JDK is not installed, you can download and install it
from the official ORACLE website.
After installing the JDK, you can run the above command again to verify that it has been installed correctly.
***
Next, check if `MySQL` is installed on your computer.
To do this, enter the command `mysql --version` in the terminal.
If MySQL is not installed, you can download it from the official site `https://www.mysql.com/`.
After setting up MySQL Workbench, create a new database named `wealth_voyage_db`.

The application includes `.sql` files to import, which load tables with sample data.
In the `application.properties` file within the `resources` folder, update the user and password configuration.
***
After configuring the database, check if Maven is installed on your computer.
To do this, enter the command `mvn -v` in the terminal.
If Maven is not installed, you can download it from the official Maven website: `https://maven.apache.org/`.

After downloading the appropriate package, extract it and add it to the `environment variables` (for detailed
instructions, refer to the Apache website).
Once these steps are completed, check again to ensure that Maven has been correctly installed.
***
After adding JDK, MySQL, and Maven, you can proceed to run the application.
To do this, navigate to the folder where the `pom.xml` file is located and open a terminal.
In the terminal, enter the command `mvn clean install`, and then run the command `mvn spring-boot:run`.

After these steps, the project should compile.


***

## Frontend

To run the frontend part, you need to check if `node.js` is installed on your computer.
To do this, enter the command `node -v` in the terminal.
If node.js is not installed, you can download it from the official website: `https://nodejs.org/en`.

After installation, check again to ensure that node.js is installed and that `npm` is also present.
To verify if npm is correctly installed, use the command `npm -v`.
***
After installing node.js, navigate to the folder containing the` package.json` file and open a terminal there.
In the terminal, enter the command `npm install`, followed by `npm start`.
After a short moment, the application's welcome page should open in your browser.

## Login/Registration

If the database is correctly configured and has functioning communication,
you can log in with a sample account using the pre-configured data on the login screen.

#### Login:

admin

#### Password:

password

If you prefer not to use the sample account, you can create a new account in the registration window.

# Future Development Plans

* Adding a password reminder feature
* Adding a feature for tracking interest-bearing installments
* Adding a feature for printing the transaction balance from the last month
* Adding a profile editing feature
* Adding notification functionality with a bell icon
* Adding a language change feature
* Adding a feature to switch between dark and light modes
* Adding support for custom exceptions
* Adding unit tests
* Adding an admin panel
* Adding Swagger documentation
* Optimizing and improving the code
* Containerizing the entire project with Docker
* Deploying the project to the cloud




