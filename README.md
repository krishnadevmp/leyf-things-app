# LeyfThings - Goal Tracker (Frontend)

An AI-powered Goal Tracking Progressive Web Application built with React, TypeScript, and Material UI that helps users transform ideas into structured goals and actionable milestones. The application combines manual goal management with AI-assisted goal generation to create an intuitive and motivating productivity experience.

## ✨ Features

- 🤖 AI-powered goal and milestone generation from natural language prompts
- 🎯 Create, update, delete and manage goals
- ✅ Create and track milestones for every goal
- 📈 Visual progress tracking based on milestone completion
- 🔔 Global success/error notifications
- 📱 Responsive design optimized for desktop and mobile
- ⚡ Offline-ready architecture
- 🔄 Automatic data synchronization using React Query
- 🎨 Modern Material UI interface

---

## 🛠 Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Material UI (MUI)
- React Router
- React Query (TanStack Query)
- React Hook Form
- Axios

### State Management
- React Query
- React Hook Form

### UI
- Material UI
- MUI Icons

---

## Project Structure

```
src
│
├── components
│   ├── goal
│   ├── milestone
│   ├── common
│   └── layout
│
├── pages
│
├── services
│
├── hooks
│
├── routes
│
├── providers
│
└── utils
```

---

## Features

### Goal Management

- Create goals manually
- Generate goals using AI
- Update goals
- Delete goals
- Goal status tracking
- Responsive goal cards
- Progress visualization

### Milestone Management

- Create milestones
- Update milestone status
- Edit milestones
- Delete milestones
- Progress calculation

### AI Goal Generation

Describe your objective in natural language.

Example:

> "I want to prepare for a software engineering interview in 3 months while working full-time."

The AI automatically generates:

- Goal
- Description
- Milestones
- Timeline

---

## Installation

```bash
git clone https://github.com/yourusername/leyfthings-frontend.git

cd leyfthings-frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file.

```env
VITE_API_BASE_URL=https://localhost:7223
```

---

## Available Scripts

```bash
npm run dev

npm run build

npm run preview

npm run lint
```

---

## Screens

- Dashboard
- Goal Listing
- Goal Details
- AI Goal Creation
- Manual Goal Creation

---

## Future Enhancements

- Push Notifications
- AI Chat Assistant
- Goal Analytics
- Calendar Integration
- Recurring Goals
- Habit Tracking
- Dark Mode
- Goal Templates
- Voice Prompt Support

---

## Backend Repository

This frontend communicates with:

**LeyfThings Backend (.NET Core Web API)**
