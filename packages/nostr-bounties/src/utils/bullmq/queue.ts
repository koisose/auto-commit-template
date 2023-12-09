// addJobToQueue.js
import { Queue } from 'bullmq';
import {CONNECTOR,DEFAULT_REMOVE_CONFIG} from './config';
import setUpWorker from './worker';

const myQueue = new Queue('JOBS', {
  connection: CONNECTOR,
});
myQueue.setMaxListeners(Number(myQueue.getMaxListeners()) + 100);

setUpWorker();

const addJobToQueue = (data) => {
  return myQueue.add(data.jobName, data, DEFAULT_REMOVE_CONFIG);
};

export default addJobToQueue;