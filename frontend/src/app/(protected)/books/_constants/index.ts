import { ReadingStatus } from "../_types";

export const STATUS_OPTIONS: { value: ReadingStatus; label: string }[] = [
  { value: "unread", label: "未読" },
  { value: "reading", label: "読書中" },
  { value: "completed", label: "読了" },
];

export const RATING_OPTIONS: { value: string; label: string }[] = [
  { value: "1", label: "★" },
  { value: "2", label: "★★" },
  { value: "3", label: "★★★" },
  { value: "4", label: "★★★★" },
  { value: "5", label: "★★★★★" },
];
