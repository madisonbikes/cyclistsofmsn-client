import { format } from "date-fns";

export const formatDate = (date: Date) => {
  return format(date, "yyy-MM-dd");
};

export const formatTimestamp = (date: Date) => {
  return format(date, "yyy-MM-dd HH:mm:ss zzzz");
};
