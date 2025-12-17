import React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  bgColor: string; // Tailor card colors
  textColor: string;
}

export interface Category {
  id: string;
  label: string;
  icon?: React.ReactNode;
}