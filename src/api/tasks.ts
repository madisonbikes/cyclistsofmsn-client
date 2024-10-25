import { Post, postSchema, SchedulePostOptions } from "./contract";
import { Tasks } from "./contract/Tasks";

export const schedulePost = async (
  options: SchedulePostOptions,
): Promise<Post> => {
  const response = await Tasks.schedulePost().send(options);
  return postSchema.parse(response.body);
};
