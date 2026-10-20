import React from 'react';
import {useTodoController} from './controllers/useTodoController.js';
import TodoAppView from './views/TodoAppView.jsx';
export default function App() { return <TodoAppView {...useTodoController()}/>; }
