# Rhyta Client Example

A small example CLI client is included in this repository to test the API endpoints.

## Technologies Used

- **Application**:
    - [TypeScript](https://www.typescriptlang.org/): A strongly typed programming language that builds on JavaScript.
    - [Axios](https://axios-http.com/): A simple promise based HTTP client for the browser and Node.js.
    - [Jest](https://jestjs.io/): A JavaScript testing framework.

## Getting Started

To run this application locally, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Kawtious/RhytaServerJS.git
    ```

2. Change into the example client project directory:

    ```bash
    cd RhytaServerJS\examples\client
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Configure the API URL:

   In the root directory of the example client project, create a `.env` file:

    ```bash
    touch .env
    ```

   Open the `.env` file using a text editor and make sure to configure the API base URL:

    ```plaintext
    API_BASE_URL="your_api_base_url"      # "http://localhost:3000"
    ```

   Replace `your_api_base_url` with the actual API base URL.

5. Build the application:

    ```bash
    npm run build
    ```

6. Start the application:

    ```bash
    npm run start
    ```
