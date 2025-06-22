# User Management & Task Tracking System

A comprehensive React-based web application for managing users, their posts, and tasks. Built with modern React patterns, Redux Toolkit for state management, and Bootstrap for responsive UI design.

## 🚀 Features

### Core Functionalities

1. **User Management**

   - Display list of users with expandable cards
   - Edit user information (username, email, phone, website, address, company)
   - Form validation using Yup schema validation
   - Real-time change detection with save/cancel functionality

2. **User Posts Management**

   - View user-specific posts on individual user detail pages
   - Navigate between users list and user details
   - Responsive posts display with user context

3. **Task Management**
   - Comprehensive task listing with filtering capabilities
   - Filter by status (All, Completed, Incomplete)
   - Search by task title and user ID
   - Toggle task completion status
   - Pagination for large task lists
   - Real-time status updates

### Technical Features

- **State Management**: Redux Toolkit with Redux Persist for data persistence
- **Routing**: React Router v7 with nested routing
- **Form Handling**: React Hook Form with Yup validation
- **UI Framework**: React Bootstrap with custom SCSS styling
- **HTTP Client**: Axios for API communication
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first approach with Bootstrap

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0, TypeScript 4.9.5
- **State Management**: Redux Toolkit 2.8.2, Redux Persist 6.0.0
- **Routing**: React Router DOM 7.6.2
- **UI Components**: React Bootstrap 2.10.10, Bootstrap 5.3.7
- **Form Management**: React Hook Form 7.58.1, Yup 1.6.1
- **HTTP Client**: Axios 1.10.0
- **Icons**: Lucide React 0.344.0
- **Styling**: SCSS with custom variables and components
- **Build Tool**: Create React App 5.0.1

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Users-list
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   ```bash
   cp .env-example .env
   ```

   The application uses JSONPlaceholder API by default. You can modify the `REACT_APP_API_BASE_URL` in the `.env` file if needed.

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Application header
│   ├── InputField.tsx  # Form input component
│   ├── UserCard/       # User card with edit functionality
│   ├── PostsList/      # Posts display component
│   └── Tasks/          # Task management components
├── hooks/              # Custom React hooks
├── layouts/            # Layout components
├── pages/              # Main page components
├── routes/             # Routing configuration
├── services/           # API service layer
├── store/              # Redux store and slices
├── styles/             # SCSS stylesheets
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎯 Key Implementation Highlights

### State Management Architecture

- **Redux Toolkit**: Modern Redux with simplified boilerplate
- **Redux Persist**: Automatic state persistence across sessions
- **Async Thunks**: Clean async action handling for API calls
- **Slice Pattern**: Organized state management by feature

### Form Handling & Validation

- **React Hook Form**: Performance-optimized form management
- **Yup Schema Validation**: Comprehensive form validation rules
- **Real-time Validation**: Instant feedback on user input
- **Change Detection**: Smart detection of form modifications

### User Experience Features

- **Loading States**: Spinner components during data fetching
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Responsive Design**: Mobile-friendly interface

### API Integration

- **JSONPlaceholder API**: RESTful API for users, posts, and tasks
- **Axios Configuration**: Centralized API client
- **Type Safety**: Full TypeScript integration with API responses

## 🧪 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🔧 Configuration

The application can be configured through environment variables:

- `REACT_APP_API_BASE_URL`: Base URL for the API (defaults to JSONPlaceholder)

## 📱 Application Flow

1. **Home Page** (`/`): Displays list of users with expandable cards
2. **User Details** (`/users/:userId`): Shows user information and their posts
3. **Tasks Page** (`/tasks`): Comprehensive task management with filtering

## 🎨 Design System

- **Bootstrap 5**: Modern CSS framework for responsive design
- **Custom SCSS**: Extended styling with variables
- **Lucide Icons**: Consistent iconography throughout the app
- **Color Scheme**: Color palette with proper contrast

## 🔒 Data Persistence

- **Redux Persist**: Automatically saves application state to localStorage
- **Form State**: Maintains form data across page navigation

## 🚀 Performance Optimizations

- **useMemo**: Computed value caching
- **Optimized Re-renders**: Efficient state updates and component rendering

## 📋 Interview Notes

This project demonstrates:

- **Modern React Patterns**: Hooks, functional components
- **State Management**: Redux Toolkit with best practices
- **TypeScript Integration**: Full type safety and interface definitions
- **Form Management**: Advanced form handling with validation
- **API Integration**: Clean service layer architecture
- **Responsive Design**: Mobile-first approach
- **Code Organization**: Modular, maintainable code structure
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Performance**: Optimized rendering and data fetching
- **User Experience**: Intuitive navigation and interaction patterns

The application showcases a complete full-stack frontend solution with real-world patterns and best practices suitable for production environments.
