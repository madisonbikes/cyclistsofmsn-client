import { Request, post } from "superagent";

const prefix = `/api/v1/tasks`;

export const Tasks = {
  schedulePost: (): Request => post(`${prefix}/schedulePost`),
};
