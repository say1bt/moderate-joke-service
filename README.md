
# Moderate Service

The Moderate Service is a microservice designed for moderating jokes within the Jokes Service architecture. It provides functionality for authenticating moderators, editing, submitting, approving, rejecting, deleting jokes, and changing their categories. This service is built using Node.js and Express.js, and it interacts with other microservices for comprehensive joke management.

## Features

- **Moderator Authentication**: Secure authentication mechanism for moderators.
- **Joke Management**: Allows moderators to edit, submit, approve, reject, delete jokes, and change their categories.
- **Integration**: Interacts with other microservices for seamless joke management.
- **API Documentation**: Swagger is integrated for API documentation.
- **Dockerized**: The service is containerized using Docker.
- **Deployment**: Deployed to Amazon EC2 instances for scalability and reliability.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Endpoints](#api-endpoints)
4. [Docker](#docker)
5. [Deployment](#deployment)
6. [Swagger Documentation](#swagger-documentation)
7. [Contributing](#contributing)
8. [License](#license)

## Installation

To get started with the Moderate Service, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/moderate-service.git
   ```

2. Navigate to the project directory:
   ```bash
   cd moderate-service
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the Moderate Service locally, run:
```bash
npm start
```

The service will be available at `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /auth/login`: Authenticate a moderator.

### Jokes Management

- `GET /jokes`: Retrieve all jokes for moderation.
- `POST /jokes`: Submit a new joke.
- `PUT /jokes/:id`: Edit an existing joke.
- `DELETE /jokes/:id`: Delete a joke.
- `POST /jokes/:id/approve`: Approve a joke.
- `POST /jokes/:id/reject`: Reject a joke.
- `PATCH /jokes/:id/category`: Change the category of a joke.

## Docker

The service is containerized using Docker. To build and run the Docker container, follow these steps:

1. Build the Docker image:
   ```bash
   docker build -t moderate-service .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 moderate-service
   ```

## Deployment

The Moderate Service is deployed to Amazon EC2 instances for scalability and reliability. The deployment process includes:

1. Pushing the Docker image to Amazon ECR (Elastic Container Registry).
2. Creating and configuring an EC2 instance.
3. Pulling and running the Docker image on the EC2 instance.

## Swagger Documentation

Swagger is integrated for API documentation. Once the service is running, you can access the Swagger UI at `http://localhost:3000/api-docs` to explore the available endpoints and their details.

## Contributing

We welcome contributions to improve the Moderate Service. Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to modify this README file as needed to fit your specific project requirements.
