"use client";
import {useDashboardController} from '../client/controllers/useDashboardController';
import DashboardView from '../client/views/DashboardView';
export default function Dashboard() { return <DashboardView {...useDashboardController()}/>; }
