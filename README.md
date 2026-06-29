Wobb Frontend Assignment

A modern influencer search and profile management application built with React, TypeScript, Vite, and Tailwind CSS. This project enhances the provided starter application by improving the user interface, application architecture, performance, and overall developer experience while implementing the required assignment features.

⸻

Live Demo

Live URL: https://wobb-assignment.onrender.com

⸻

Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Zustand
* (Add any additional libraries you used)

⸻

Features

Dashboard

* Search influencers by username or full name
* Filter influencers by platform
* Responsive search experience
* Improved loading and empty states

Profile Details

* Dedicated profile page for each influencer
* Enhanced profile layout
* Better information hierarchy
* Improved navigation

Shortlist Management

* Add profiles to a shortlist
* Prevent duplicate entries
* Remove profiles from the shortlist
* Persistent shortlist using localStorage
* Real-time selected profile count

UI/UX Improvements

* Modern responsive interface
* Improved visual hierarchy
* Better typography and spacing
* Mobile-first responsive design
* Consistent component styling
* Improved accessibility
* Smooth interactions and transitions

⸻

Changes Made

1. Bug Fixes

* Fixed intentional bugs throughout the application.
* Improved search functionality.
* Fixed filtering issues.
* Improved routing behavior.
* Resolved state update inconsistencies.
* Improved error handling and edge-case management.

⸻

2. UI/UX Redesign

The application interface was completely redesigned to provide a more polished and modern user experience.

Improvements include:

* Redesigned dashboard layout
* Improved profile cards
* Responsive layouts for all screen sizes
* Better spacing and typography
* Consistent color palette
* Enhanced navigation
* Improved loading, empty, and error states

⸻

3. State Management

Replaced the original React Context implementation with Zustand.

Benefits include:

* Simpler state management
* Better scalability
* Reduced unnecessary re-renders
* Cleaner architecture
* Persistent state using localStorage

⸻

4. Profile Shortlist Feature

Implemented the complete “Add to List” functionality.

Features include:

* Add profiles to shortlist
* Prevent duplicate entries
* Remove profiles
* Persistent storage
* Responsive shortlist panel
* Empty state handling

⸻

5. Code Quality Improvements

Refactored the project to improve maintainability.

Changes include:

* Better folder organization
* Reusable components
* Strong TypeScript typing
* Cleaner component structure
* Utility functions
* Improved code readability
* Reduced code duplication

⸻

6. Performance Optimizations

Applied several optimizations including:

* Reduced unnecessary re-renders
* Memoized expensive computations where appropriate
* Optimized component rendering
* Efficient state updates
* Improved data loading

⸻

7. Accessibility Improvements

Implemented accessibility enhancements including:

* Semantic HTML
* Keyboard-friendly interactions
* Improved focus states
* Better color contrast
* Accessible form controls
* ARIA attributes where appropriate

⸻

Libraries Added

Library	Purpose
Zustand	Global state management and persistence
Lucide React	Modern icon library
Framer Motion (if used)	Animations and micro-interactions
React Hot Toast (if used)	User notifications
clsx (if used)	Conditional class names
tailwind-merge (if used)	Tailwind class merging

(Remove any libraries you did not use.)

⸻

Assumptions Made

* Profile usernames are unique identifiers.
* Profile data is loaded from local JSON files.
* localStorage is available for persistence.
* Search should work across usernames and display names.
* Duplicate profiles should not be added to the shortlist.

⸻

Trade-offs

* Chose Zustand over React Context for a simpler and more scalable state management solution.
* Used localStorage for persistence instead of a backend since the assignment uses local JSON data.
* Focused on maintainability and readability over excessive abstraction.
* Added only libraries that provided clear value without unnecessarily increasing project complexity.

⸻

Remaining Improvements

Given additional time, the following enhancements could be implemented:

* Unit and integration tests
* End-to-end testing
* Infinite scrolling or pagination
* Server-side API integration
* Advanced filtering and sorting
* Dark mode
* User authentication
* Virtualized lists for large datasets
* Improved analytics and monitoring

⸻

Installation

Clone the repository:

git clone <your-repository-url>

Navigate to the project:

cd <repository-name>

Install dependencies:

npm install

Start the development server:

npm run dev

Build for production:

npm run build

Run ESLint:

npm run lint

⸻

Folder Structure

src/
├── assets/
├── components/
├── pages/
├── store/
├── hooks/
├── types/
├── utils/
├── layouts/
└── App.tsx

⸻

Build Status

* ✅ Project builds successfully
* ✅ No runtime errors
* ✅ Responsive across desktop and mobile
* ✅ Zustand implemented
* ✅ Persistent shortlist implemented
* ✅ Improved UI/UX
* ✅ TypeScript used throughout
* ✅ Ready for production build

⸻

Future Scope

Potential future enhancements include:

* Backend integration
* Authentication
* Cloud data persistence
* Real-time updates
* Advanced search capabilities
* User preferences
* Theme customization
* Performance monitoring

⸻

Author

Aayan Noori

GitHub: (Add your GitHub profile link here)
