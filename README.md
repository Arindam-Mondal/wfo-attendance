# WFO (Work From Office) Attendance Tracker

**WFO Attendance Tracker** is a web application designed to help users track the number of days they have worked from the office. The app allows users to easily mark their attendance and view their progress toward the mandatory office attendance requirement (typically 12 days). It’s especially useful for individuals who may forget how many days they’ve already worked from the office and helps them plan their office schedule accordingly.

## Demo

You can access the live app at:  
[https://wfo-attendance.vercel.app/](https://wfo-attendance.vercel.app/)

## GitHub Repository

The source code for the project is available here:  
[https://github.com/Arindam-Mondal/wfo-attendance/tree/main](https://github.com/Arindam-Mondal/wfo-attendance/tree/main)

## Features

- **Mark Attendance**: Easily mark your attendance when you’re working from the office.
- **Track Office Days**: View how many days you’ve completed working from the office.
- **Google Sign-In**: Firebase Authentication is used for easy login via Google.
- **Customizable Office Days**: The number of mandatory office days is configurable (currently set to 12 days).
- **Offline Mode**: The app aims to support offline functionality and be a Progressive Web App (PWA).

## Future Enhancements

- Storing the number of days worked in Firebase database so that users can see their previously marked attendance.
- Making the number of mandatory office days configurable by the user.
- Full support for offline mode and PWA functionality.

## Technologies Used

- **Frontend**: Angular
- **Authentication**: Firebase Authentication (Google Sign-In)
- **Environment Variables**: @ngx-env/builder for managing environment variables ([reference](https://www.dotenv.org/docs/frameworks/angular/vercel))
- **Deployment**: Vercel

## Setup Instructions

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (LTS version recommended, 16.x or higher)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)
- Git

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arindam-Mondal/wfo-attendance.git
   cd wfo-attendance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**

   Create a `.env` file in the project root directory and add your Firebase configuration:
   ```plaintext
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   ```

4. **Update environment files**

   Make sure your Firebase configuration is properly imported in `src/environments/environment.ts` and `src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: false,
     firebase: {
         apiKey: import.meta.env["NG_APP_FB_API_KEY"],
          authDomain: import.meta.env["NG_APP_FB_AUTH_DOMAIN"],
          projectId: import.meta.env["NG_APP_FB_PROJECT_ID"],
          storageBucket: import.meta.env["NG_APP_FB_STORAGE_BUCKET"],
          messagingSenderId: import.meta.env["NG_APP_FB_MESSAGING_SENDER_ID"],
          appId: import.meta.env["NG_APP_FB_APP_ID"]
     }
   };
   ```

5. **Run the development server**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Firebase Authentication Setup

1. **Install @angular/fire**
   ```bash
   ng add @angular/fire
   ```

2. **Import Firebase modules in app.module.ts**
   ```typescript
   import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
   import { getAuth, provideAuth } from '@angular/fire/auth';
   import { environment } from '../environments/environment';

   @NgModule({
     imports: [
       provideFirebaseApp(() => initializeApp(environment.firebase)),
       provideAuth(() => getAuth()),
       // ... other imports
     ],
     // ... rest of the module configuration
   })
   ```

## Available Scripts

- `ng serve`: Start development server
- `ng build`: Build the project
- `ng test`: Execute unit tests
- `ng e2e`: Execute end-to-end tests
- `ng lint`: Lint the project

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further Help

- For more details about Firebase Authentication, visit the [AngularFire Auth documentation](https://github.com/angular/angularfire/blob/main/docs/auth.md)
- To get more help on the Angular CLI use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.io/cli)

## Contributing

We welcome contributions to improve the WFO Attendance Tracker app! To contribute:

1. **Fork** the repository to your GitHub account.

2. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature-branch
   ```

3. **Make your changes** or additions.

4. **Commit your changes** with a descriptive message:
   ```bash
   git commit -am 'Add new feature'
   ```

5. **Push your changes** to your forked repository:
   ```bash
   git push origin feature-branch
   ```

6. **Open a pull request** on the main repository and describe your changes.
