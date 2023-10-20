# RhytaServerJS

[issues-shield]: https://img.shields.io/github/issues/Kawtious/RhytaServerJS.svg?style=for-the-badge

[issues-url]: https://github.com/Kawtious/RhytaServerJS/issues

[license-shield]: https://img.shields.io/github/license/Kawtious/RhytaServerJS.svg?style=for-the-badge

[license-url]: https://github.com/Kawtious/RhytaServerJS/blob/master/LICENSE

[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

This repository contains an application designed to showcase the resource storage system for an AI scheduler that
automates the creation of schedules for professors, classrooms, and other resources in educational institutions.

This branch of the project exists only to demonstrate only the most crucial functionality of the project whilst
requiring only minimal configuration in order to get it running.

## Technologies Used

- **Application**:
    - [TypeScript](https://www.typescriptlang.org/): A strongly typed programming language that builds on JavaScript.
    - [Node.js](https://nodejs.org/): A JavaScript runtime for server-side development.
    - [Express.js](https://expressjs.com/): A Node.js web application framework.
    - [TypeORM](https://typeorm.io/): A TypeScript ORM (object-relational mapper) library.
    - [Jest](https://jestjs.io/): A JavaScript testing framework.

- **Databases**:
    - [SQLite](https://www.sqlite.org/index.html): A C-language library that implements a self-contained SQL database
      engine.

## Getting Started

To run this application locally, follow these steps:

1. Clone this branch of the repository to your local machine:

    ```bash
    git clone --branch minimal-configuration --single-branch https://github.com/Kawtious/RhytaServerJS.git
    ```

2. Change into the project directory:

    ```bash
    cd RhytaServerJS
    ```

3. Install the required dependencies:

    ```bash
    # Install dependencies
    npm install
    ```

4. (Optional) Configure the server:

   If you wish to configure where the server is hosted, follow these instructions:

   In the root directory of the project, create a `.env` file:

    ```bash
    touch .env
    ```

   Open the `.env` file using a text editor and add the following environment variables:

    ```plaintext
    SERVER_HOST="your_server_host"             # "localhost"
    SERVER_PORT=your_server_port               # 3000
    ```

   Replace `your_server_host`, and `your_server_port` with your preferred connection details.

5. Build the application:

    ```bash
    npm run build
    ```

6. Start the application:

    ```bash
    npm run start
    ```

## Contributing

This project is meant to develop specific features and functionalities of another system using web frameworks
specifically. Basically, this project is meant for educational purposes. Therefore, we have intentionally limited
contributions to ensure the project remains aligned with its educational objectives.

## License

This application is open-source and available under the [MIT License](LICENSE).

## Authors

- [Kawtious](https://github.com/Kawtious)

- [Zeferito](https://github.com/Zeferito)

Feel free to reach out if you have any questions or need assistance with this application.
