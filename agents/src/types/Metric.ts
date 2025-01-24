export interface MetricData {
  date: string;
  agentId: string;
  tasks_completed: number;
  avg_rating: number;
  review_count: number;
}

export enum MetricType {
TasksCompleted = 'tasks_completed',
Status = 'status',
AverageRating = 'average_rating',
CostToComplete = 'cost_to_complete',
Currency = 'currency',
PaymentCompleted = 'payment_completed',
TransactionTime = 'transaction_time',
HumanAssistanceRequestCount = 'human_assistance_request_count',
}