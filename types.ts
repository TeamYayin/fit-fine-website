export interface SuccessStory {
  id: string;
  name: string;
  beforeWeight: number;
  afterWeight: number;
  durationWeeks: number;
  quote: string;
  description: string;
  imageUrl: string;
  plan?: 'Silver' | 'Gold' | 'Platinum';
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Quote {
  id: number;
  text: string;
}

export type LoginMode = 'USER' | 'ADMIN';

export interface AdminStats {
  totalUsers: number;
  activeSubscriptions: number;
  revenue: number;
}