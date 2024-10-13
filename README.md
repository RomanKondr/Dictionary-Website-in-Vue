# Vocabulary Test Application

A vocabulary testing and word management application built using **Vue.js**. The app allows users to manage words, take vocabulary tests, view statistics, and store test results.

## Features

- **Word Management**: Create, view, update, and delete words in English, German, and Spanish.
- **Vocabulary Test**: Test your vocabulary knowledge with randomly selected words.
- **Statistics**: View historical test results with detailed statistics.
- **Responsive UI**: The application uses Semantic UI for a responsive and clean user interface.
- **API Integration**: The application connects to a back-end API to store and retrieve test results.

## Project Structure

- **Components**:
  - `WordForm`: A form component to create or update words (English, German, Spanish).
  - `Test`: A component to conduct vocabulary tests, providing real-time feedback on user answers.
  - `Statistics`: A component that displays the statistics of previous tests.
  
- **Views**:
  - `Words.vue`: Displays a list of words and provides options to edit or delete them.
  - `New.vue`: A view to create new words.
  - `Show.vue`: Displays details of a specific word.
  - `Edit.vue`: Allows editing an existing word.
  - `Test.vue`: Conducts vocabulary testing with random word selection.
  - `Statistics.vue`: Shows the results of all the tests taken by the user.

- **Helpers**:
  - `helpers.js`: A helper file that handles API requests using Axios and provides error handling.

- **Router**:
  - Configures routes for navigating between pages, including `Words`, `New Word`, `Edit`, `Test`, and `Statistics`.

## Installation

### Prerequisites

- **Node.js** (>= 14.x)
- **Vue CLI** (>= 4.x)
- **npm** or **yarn**

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-repo/vocabulary-app.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd vocabulary-app
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Run the development server**:

    ```bash
    npm run serve
    ```

    The application will be available at `http://localhost:8080`.

### API Setup

This project interacts with an API to store and retrieve test results and word data. Ensure you have the backend API running on `http://localhost:3000`.

Example API endpoints used:
- **`GET /words`**: Fetch all words.
- **`POST /words`**: Create a new word.
- **`GET /words/:id`**: Get a specific word by ID.
- **`PUT /words/:id`**: Update a word by ID.
- **`DELETE /words/:id`**: Delete a word by ID.
- **`POST /api/test-results`**: Save test results.
- **`GET /api/test-results`**: Retrieve all test results.

## Usage

### Adding Words

- Navigate to the **Words** section and click on "New" to add a new word in English, German, and Spanish.

### Taking a Vocabulary Test

- Navigate to the **Test** section. The application will present random words in either German or Spanish, and you must provide the English translation.
- After submitting, the app will notify you if your answer is correct or incorrect, and at the end of the test, your results will be saved to the statistics.

### Viewing Statistics

- Navigate to the **Statistics** section to view your past test results, including your score and the date of the test.

## Configuration

### API Configuration

To modify the API base URL, open the `helpers.js` file and update the `baseURL` value to point to your API:

## Dependencies
- Vue.js: The JavaScript framework for building the user interface.
- Vue Router: For navigation between different views.
- Axios: To handle HTTP requests to the API.
- Semantic UI: For responsive and modern UI components.
- vue-flash-message: For showing flash messages for user feedback.
