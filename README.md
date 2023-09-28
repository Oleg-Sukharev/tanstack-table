# React + TypeScript + Vite + TanStack Table v8 + React Query + Radix UI primitives  + Tailwindcss

Features:

Followed requirements:
1. Valid markup;
2. Good a11y (navigating by keyboard, screen readers);
3. Good performance;
4. 1024px minimal screen size by width (should not skip some devices with
similar screen size);
5. Cross-browser compatible (Safari/iPadOS/iOS >= 14, Chrome >= 88, Firefox
>= 78, Edge >= 88, Opera >= 74, Samsung Internet >= 15); vite from the box covers this point

### API -  DummyJSON
https://dummyjson.com/ 
https://dummyjson.com/users

### Install packages

```shell
npm i
```

### Start the app

```shell
npm run dev
```

### Build the app

```shell
npm run build
```

### Features

- Sticky Table Header, First, and Last Columns
- Table settings button includes a combobox for column management.
- Users can remove or add columns to the table.
  Options for full name, username, settings, and email are disabled for selection.
- Table settings are saved to local storage and persist after page reloads.  
- Client-side search functionality within the combobox, without the need for API.

# Server side Pagination and search filters
- Search functionality is available via API.
- Pagination functionality is implemented via API.
- Users can choose the number of items per page from options: 10, 20, and 50.
  Input validation ensures only numbers are accepted, and it cannot exceed the total number of pages in the table.
