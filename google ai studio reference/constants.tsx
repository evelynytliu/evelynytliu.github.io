import React from 'react';
import { Project, Category } from './types';
import { LayoutGrid, Star, PenTool, Code, FileText, StickyNote } from 'lucide-react';

export const CATEGORIES: Category[] = [
  { id: 'all', label: '全部', icon: <LayoutGrid size={18} /> },
  { id: 'selected', label: '精選專案', icon: <Star size={18} /> },
  { id: 'design', label: '設計作品', icon: <PenTool size={18} /> },
  { id: 'code', label: '寫的程式', icon: <Code size={18} /> },
  { id: 'notion', label: 'Notion 模板', icon: <FileText size={18} /> },
  { id: 'notes', label: '隨筆', icon: <StickyNote size={18} /> },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: "Round & Round",
    description: "韓國滑步車運動小餐館. 2 HR 溜步車入場券 $300",
    category: 'design',
    imageUrl: "https://picsum.photos/id/452/400/300", // Placeholder for the ticket
    bgColor: "bg-[#7CA5B8]",
    textColor: "text-white"
  },
  {
    id: '2',
    title: "Menu Design",
    description: "Simple, elegant layouts for local cafes.",
    category: 'design',
    imageUrl: "https://picsum.photos/id/431/400/300",
    bgColor: "bg-[#2F5C6F]",
    textColor: "text-white"
  },
  {
    id: '3',
    title: "Portfolio V1",
    description: "Previous iteration of personal branding.",
    category: 'code',
    imageUrl: "https://picsum.photos/id/180/400/300",
    bgColor: "bg-slate-200",
    textColor: "text-slate-800"
  },
  {
    id: '4',
    title: "Notion Life Planner",
    description: "Organize your weeks with this aesthetic template.",
    category: 'notion',
    imageUrl: "https://picsum.photos/id/366/400/300",
    bgColor: "bg-orange-100",
    textColor: "text-slate-800"
  },
   {
    id: '5',
    title: "Typography Study",
    description: "Exploration of serif and sans-serif pairings.",
    category: 'design',
    imageUrl: "https://picsum.photos/id/250/400/300",
    bgColor: "bg-teal-50",
    textColor: "text-teal-900"
  },
];
