# G00473380 - Recipe Finder App

An Ionic Angular mobile application that allows users to search for recipes by ingredients using the Spoonacular API.

## Features

- Search recipes by ingredients
- View recipe details including ingredients and instructions
- Responsive mobile-first design using Ionic components
- Integration with Spoonacular Food API

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Ionic CLI: `npm install -g @ionic/cli`

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Angelwall97/G00473380.git
   cd G00473380
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API Key:**
   - Copy `src/environments/environment.example.ts` to `src/environments/environment.ts`
   - Get a free API key from [Spoonacular](https://spoonacular.com/food-api)
   - Replace `YOUR_API_KEY_HERE` with your actual API key in `environment.ts`

   ```typescript
   export const environment = {
     production: false,
     spoonacularApiKey: 'your-actual-api-key-here',
   };
   ```

4. **Run the application:**
   ```bash
   ionic serve
   ```
   or
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── app/
│   ├── home/                 # Home page with ingredient search
│   ├── recipe-details/       # Recipe details page
│   └── services/             # API service layer
├── environments/             # Environment configuration
└── theme/                    # Global styling
```

## Technologies Used

- Angular 20
- Ionic 8
- Capacitor 8
- RxJS
- TypeScript

## API Information

This app uses the [Spoonacular API](https://spoonacular.com/food-api).

- Free tier: 150 requests per day
- Endpoints used:
  - `/recipes/findByIngredients` - Search recipes by ingredients
  - `/recipes/{id}/information` - Get detailed recipe information

## Author

Angel Wall (G00473380)
ATU Galway - Mobile Applications Development

## License

This project is for educational purposes.
