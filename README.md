# Contact Manager

A simple contact management app I built using React and TypeScript with Redux for state management.

## What it does

This app lets you manage your contacts - add them, search through them, edit their info, and delete them. I've also added a bulk delete feature if you need to remove multiple contacts at once.

## Features I implemented

- Add new contacts with their name, email, phone, and address
- Search contacts by name, email, phone, or state
- Edit existing contacts
- Delete single or multiple contacts
- All data saves automatically to your browser's localStorage
- Form validation for required fields and formats
- Dropdown for Indian states

## Running the project

First, install the dependencies:
```bash
npm install
```

Then start the dev server:
```bash
npm start
```

The app should open at http://localhost:3000

## Tech stack

- React with TypeScript
- Redux Toolkit for state management
- Custom CSS (no UI frameworks)
- UUID for generating unique IDs
- localStorage for data persistence

## Project structure

```
src/
 components/          # All React components
    Header.tsx
    SearchBar.tsx
    ContactList.tsx
    ContactItem.tsx
    ContactModal.tsx
    ConfirmDialog.tsx
 store/              # Redux setup
    store.ts
    contactsSlice.ts
 utils/              # Helper functions
    validators.ts
 App.tsx             # Main app component
 index.tsx           # Entry point
 styles.css          # All styles
 types.ts            # TypeScript types
```

## How to use

**Adding a contact:**
Click "Add Contact" button, fill in the form (fields with * are required), and save.

**Searching:**
Just type in the search box - it filters in real-time.

**Editing:**
Click the edit icon on any contact row.

**Deleting:**
- Single: Click the delete icon
- Bulk: Check the boxes next to contacts you want to delete, then click "Bulk Delete"

## Notes

- Contact data persists in localStorage, so it survives page refreshes
- Email and phone validation ensures data quality
- The design follows the Figma mockup provided
- State dropdown includes all Indian states and union territories

## Design reference

Based on this Figma design: https://www.figma.com/design/cVyF5IuY5JIgkhRZ6Pm0ho/Frontend-Task
