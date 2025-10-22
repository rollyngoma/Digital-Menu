# Digital Menu

A beautiful React Native app for managing restaurant menu items with a modern Discord-style UI.

## Student Information

- **Name**: Rolly Ngoma
- **Student Number**: ST10495178
- **Course**: [Course name to be specified]

## 🎥 Demo Video

Check out the app in action:

[![Digital Menu Demo](https://img.youtube.com/vi/UNccaupfVeM/maxresdefault.jpg)](https://youtube.com/shorts/UNccaupfVeM?si=XwZ_BCDxmcPbDA3I)

**Watch the demo**: [https://youtube.com/shorts/UNccaupfVeM?si=XwZ_BCDxmcPbDA3I](https://youtube.com/shorts/UNccaupfVeM?si=XwZ_BCDxmcPbDA3I)

## Features

**Home Screen**
- Display app title "Digital Menu"
- Show total number of menu items
- Display menu items in a clean list format
- Navigation buttons to Add New Item and Filter by Course

**Add Menu Item Screen**
- Form to add new menu items with validation
- Fields: Dish Name, Description, Course (Starter/Main/Dessert), Price
- Input validation with user-friendly alerts
- Cancel and Add Item buttons

**Filter Screen**
- Filter menu items by course type
- Real-time filtering with course picker
- Clear filter option
- Empty state handling

## Tech Stack

- **React Native** with TypeScript
- **Expo** for development and deployment
- **React Navigation** for screen navigation
- **Custom Modal Picker** for course selection
- **Expo Vector Icons** for icons

## Design

The app features a modern Discord-style aesthetic with:
- Dark theme with vibrant accent colors
- Glass-morphism effects
- Animated background blobs
- Clean typography and spacing
- Consistent color scheme

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your preferred platform:
```bash
npm run ios     # iOS Simulator
npm run android # Android Emulator
npm run web     # Web Browser
```

## Project Structure

```
DigitalMenu/
├── App.tsx                 # Main app component with navigation
├── screens/
│   ├── HomeScreen.tsx      # Home screen with menu list
│   ├── AddMenuItemScreen.tsx # Add new menu item form
│   └── FilterScreen.tsx    # Filter menu items by course
├── components/
│   └── MenuItemCard.tsx    # Reusable menu item card component
├── styles/
│   └── styles.ts           # Global styles and color scheme
├── package.json
├── tsconfig.json
└── app.json               # Expo configuration
```

## Features Implemented

- React Native with TypeScript
- Three main screens (Home, Add Item, Filter)
- Navigation between screens
- Menu item management with state
- Form validation
- Course filtering with custom modal picker
- Clean, modern UI design
- Responsive layout
- Accessibility features
- TypeScript interfaces for type safety

## Future Enhancements

- Persistent storage with AsyncStorage or SQLite
- Image upload for menu items
- Search functionality
- Menu categories management
- Export/import menu data
- User authentication
- Real-time updates
