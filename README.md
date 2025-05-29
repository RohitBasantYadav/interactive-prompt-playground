# Interactive Prompt Playground

An interactive web application that allows users to experiment with different AI model parameters and observe how they affect the generated responses. This project provides a user-friendly interface to understand the impact of various parameters like temperature, max tokens, presence penalty, and frequency penalty on AI-generated text.

## Features

- Interactive prompt input for generating AI responses
- Adjustable parameters:
  - Temperature (0.1 - 1.9)
  - Max Tokens (50 - 400)
  - Presence Penalty (0.1 - 1.5)
  - Frequency Penalty (0.1 - 1.5)
- Real-time response display with scrollable content
- Results table showing outputs across different parameter settings
- Automatic analysis of how parameter changes affect responses
- Loading states and error handling
- Responsive design for all screen sizes

## Tech Stack

- Frontend:
  - HTML5
  - CSS3
  - Vanilla JavaScript (ES6+)
- Backend:
  - Node.js
  - Express.js
  - OpenAI API

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- OpenAI API key
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd interactive-prompt-playground
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=8080
   ```

4. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

5. For the frontend, you can use any of these options:

   **Option 1: Direct Browser Opening (Simplest Method)**
   - Right-click on `frontend/index.html` file.
   - Select "Copy Path"
   - Paste the copied path in any browser's address bar
   - Press Enter

   **Option 2: Using VS Code Live Server**
   - Install "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"


## Project Structure

```
interactive-prompt-playground/
├── frontend/
│   ├── index.html      # Main HTML file
│   ├── style.css       # Stylesheet
│   └── index.js        # Frontend JavaScript
├── backend/
│   ├── server.js       # Express server
│   ├── package.json    # Backend dependencies
│   └── .env           # Environment variables
└── README.md
```

## Usage

1. Enter your prompt in the text input field
2. Adjust the parameters using the dropdown menus:
   - Temperature: Controls randomness (higher = more creative)
   - Max Tokens: Controls response length
   - Presence Penalty: Controls topic repetition
   - Frequency Penalty: Controls word repetition
3. Click "Submit" to generate a response
4. View the response in the display area
5. Compare different responses in the results table
6. Read the automatic analysis of parameter effects

## Understanding Parameters

- **Temperature**: Controls randomness in the output. Lower values (0.1) make responses more focused and deterministic, while higher values (1.9) make them more creative and varied.
- **Max Tokens**: Determines the maximum length of the response. Higher values allow for longer, more detailed responses.
- **Presence Penalty**: Reduces repetition of topics. Higher values encourage the model to talk about new topics.
- **Frequency Penalty**: Reduces repetition of words. Higher values encourage more diverse vocabulary usage.

## Contributing

Feel free to submit issues and enhancement requests!

