# Virtual Classroom Frontend

This is the frontend for the Virtual Classroom application built using React. It provides a user interface for managing classes, sessions, and lectures, and is designed to work with the backend API that handles user authentication, class management, and more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Login and register users with different roles (instructor, student).
- **Instructor Dashboard**: Manage classes, add units (books), and create sessions (chapters).
- **Student View**: Access course materials, view lectures, and participate in discussions.
- **Discussion System**: Comment on lectures and reply to comments in a nested structure.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-repo/virtual-classroom-frontend.git
    cd virtual-classroom-frontend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Create a `.env` file**:

    Copy the example `.env.example` file to `.env` and add your API URL:

    ```bash
    cp .env.example .env
    ```

    Edit `.env` and set the `REACT_APP_API_URL` variable:

    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```

## Usage

1. **Start the development server**:

    ```bash
    npm start
    ```

    This will start the frontend application on `http://localhost:3000`.

2. **Build for production**:

    ```bash
    npm run build
    ```

    This will create a production-ready build in the `build` directory.

## Folder Structure

- **`src/`**: Main source folder
  - **`components/`**: React components
  - **`contexts/`**: Context providers for state management
  - **`pages/`**: Page components
  - **`services/`**: API service functions
  - **`App.js`**: Main application component
  - **`index.js`**: Entry point for React

## API Integration

The frontend integrates with the backend API through the `services/api.js` module. This module provides functions for:

- User authentication (`login`, `register`)
- Class management (`createClass`, `addUnitToClass`, `addSessionToUnit`)
- Fetching instructor classes (`fetchInstructorClasses`)

Ensure the backend API is running and accessible at the URL specified in the `.env` file.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Open a pull request with a clear description of your changes.
