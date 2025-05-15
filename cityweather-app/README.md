# CityWeather App

A responsive Angular web application that allows users to log in using GitHub via Auth0 and view a 5-day weather forecast for any city using the OpenWeatherMap API.

---

## Features

- **Authentication with GitHub** using Auth0
- **Search for city weather** with 5-day forecasts (1 result per day)
- Displays weather data in a responsive, Bootstrap-powered table
- Weather data includes: temperature, pressure, humidity, condition, and description
- Animated background and shadowed UI box for clean user experience
- Fully responsive UI with mobile-friendly adjustments
- Protected routes via AuthGuard — only accessible after login
- Error handling for invalid cities or failed API calls
- Shared data transfer from Home ➜ Weather page via `router state`

---

## Tech Stack

- **Angular 17+**
- **Bootstrap 5**
- **Auth0 (GitHub Connection)**
- **OpenWeatherMap API**
- **RxJS + Observables**
- **CSS / Global Styling**

---

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jdee-gold/jdee-gold-take-home-codeexam.git 
   cd cityweather-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Auth0**
   - Go to [Auth0 Dashboard](https://auth0.com/)
   - Create a new application (Single Page App)
   - Set up a **GitHub connection** in "Authentication > Social"
   - Get domain and clientId from "Authentication > Settings":
    - import in app.module.ts
     ```ts
     domain: '<YOUR_AUTH0_DOMAIN>',
     clientId: '<YOUR_AUTH0_CLIENT_ID>',
     authorizationParams: {
       redirect_uri: window.location.origin
     }
     ```

4. **Get an OpenWeatherMap API Key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/)
   - Use the **Free Tier** to get an API key
   - Add your API key to your `environment.ts`:
     ```ts
     private apiKey = '<YOUR_API_KEY>';
     ```

---

## Authentication Notes

- Only GitHub login is allowed (configured in Auth0 connections)
- If unauthenticated, `/home` and `/weather` are inaccessible
- AuthGuard protects routes
- Navbar is hidden on the login page and shown on all other pages
- Logout uses:
  ```ts
  this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  ```

---

## Error Handling

- Invalid city searches trigger a message shown on the **Home page**
- If Weather page is accessed directly without data, it redirects to Home

---

## Styling & UX

- Global styles define `animated-bg`, `center-box`, and `.overlay`
- Responsive behavior hides unnecessary columns on mobile
- Input and button styles use Bootstrap classes (`form-control-lg`, `btn-lg`, etc.)

---

## Testing Ideas

- Search for valid/invalid cities
- Log in / log out behavior
- Navigation visibility based on route
- Mobile responsiveness
- Protected route enforcement

---

## License

MIT License. Free to use and modify.

---

> Built with enthusiasm and hope using Angular + Auth0 + OpenWeatherMap