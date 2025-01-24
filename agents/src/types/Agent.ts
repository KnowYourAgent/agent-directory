
import { Capability } from './Capability';
import { Metric } from './Metric';

export interface Agent {
  id: string;
  name: string;
  category: 'autonomous' | 'analytics' | 'marketing';
  type: string; // e.g., 'ai_agent', 'tracking_agent', 'content_agent'
  description: string;
  creator: string;
  created_at: string; // ISO Date string
  capabilities: Capability[];
  tags?: string[];
  execution_stats?: {
    tasks_completed: number;
    avg_rating: number;
    review_count: number;
  };
  [key: string]: any // Allows for additional properties
}