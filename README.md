# Applicant Tracker

Applicant Tracker is a web application designed to help recruiters and hiring managers track job applicants efficiently. It provides basic CRUD operations to manage applicants.

## Features

- Add new applicants
- List all applicants
- Delete applicants
- Change applicant status

## Installation

To run the project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Steps to Install and Run

1. **Clone the repository**

   ```sh
   git clone <repository-url>
   cd applicant-tracker
   ```

2. **Run the application using Docker Compose**

   ```sh
   docker-compose up --build -d
   ```

3. **Access the application**
   Once the containers are running, open your browser and visit:

   ```
   http://localhost:3000
   ```

   (Adjust the port if necessary, depending on your setup.)

4. **Shutting down the application**
   To stop the running containers, use:

   ```sh
   docker-compose down
   ```

## Contributing

Feel free to fork the repository and submit pull requests for improvements and bug fixes.

## Contact

For any inquiries or contributions, feel free to open an issue in the repository.

## Evidence Test <a name = "proof"></a>
![](proof/final-proof.gif)