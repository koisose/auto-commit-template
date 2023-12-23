// addJobToQueue.ts
import { Queue } from "bullmq";
import { CONNECTOR, DEFAULT_REMOVE_CONFIG } from "./config";
import setUpWorker from "./worker";
import Redis from "ioredis";

const connection = new Redis(CONNECTOR as any);
const myQueue = new Queue("JOBS", { connection });
myQueue.on("error", () => {
  connection.disconnect();
});
connection.on("connect", function () {
  myQueue.setMaxListeners(Number(myQueue.getMaxListeners()) + 100);
  setUpWorker();
  console.log("Redis client connected");
});

connection.on("error", function () {
  //  console.log('Something went wrong ' + err);
  connection.disconnect();
});

// @ts-ignore
const addJobToQueue = (data) => {
  //  return {data,DEFAULT_REMOVE_CONFIG}
  return myQueue.add(data.jobName, data, DEFAULT_REMOVE_CONFIG);
};

export default addJobToQueue;
