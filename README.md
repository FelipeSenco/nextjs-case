# NextJs Case from Felipe

This is my NextJs fullstack app.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js v18.17.0 or above

## Setup Local Environment

Follow these steps to set up your local development environment:

1. **Clone the repository**

2. **Navigate to the new repository**

3. **Create a `.env.local` file**

   Create a `.env.local` file in the root directory and add the following values. You can obtain a free WeatherAPI key from [WeatherAPI.com](https://www.weatherapi.com/):

   ```plaintext
   NEXT_PUBLIC_WEATHER_API_KEY={yourWeatherApiKey}
   NEXT_PUBLIC_API_URL="http://localhost:3000/api"
   ```

4. **Install dependencies**

   Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

5. **Generate the SQLite database**

   Migrate the database to create the necessary tables:

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Initialize data in the database (not required in most cases)**

   The project rely on the database seed to generate Customers. The database seed should run automatically after the migration, but if it fails you can run the command to try again:

   ```bash
   npm run seed
   ```

7. **Build the project**

   Compile your project:

   ```bash
   npm run build
   ```

8. **Running the project**

   After the build, you can start the application by one of the following commands:

   - For development:

     ```bash
     npm run dev
     ```

   - For production (recommended):

     ```bash
     npm run start
     ```

## Usage

You can visit `http://localhost:3000` in your web browser to check the app.

### Description

This full-stack Next.js application consists of three main pages, leveraging Next.js's built-in file system-based routing for pages and API routes. It's crafted using React and TypeScript, offering a type-safe development experience. For styling, the app incorporates Tailwind CSS, providing a utility-first approach to design with responsive features. Data fetching and state management are handled by React Query, ensuring up-to-date UI based on server state.

### Home Page

- **Welcome Message**: When you visit the home page, you'll be greeted with a warm welcome message.
- **Weather Display**: The weather in Brasília is also featured on the home page. This information is retrieved using the WeatherAPI, provided you have entered a valid API key in your `.env.local` file ([setup instructions here](#setup-local-environment)).

### Customers Page

- **Customer Table**: This page displays a list of customers in a non-interactive table. You can view all the registered customers and their details here.

### Orders Page

- **Order Management**: On this page, you can create orders for customers, using a form in a modal. Once an order is created, it will appear in a table on the same page.
- **Edit/Delete Orders**: The table not only displays the orders but also allows you to edit or delete them as necessary.

Navigate through these pages using the navigation bar or by typing the direct URL into your browser. Each page demonstrates integration of front-end and back-end functionalities in a Next.js application.

## Running Tests

To ensure the quality and performance of the application, tests were included.

### Jest Tests

For running the unit tests with Jest, follow these steps:

```bash
npm run test
```

### Playwright Tests

To run tests with Playwright, make sure the app is running using `npm run start`, as these tests interact with the live application.

#### Install Browsers

Before running Playwright tests for the first time, you need to ensure all the necessary browsers are installed:

```bash
npx playwright install
```

#### Run tests

Now the tests should be ready to run with:

```bash
npm run test:playwright
```
