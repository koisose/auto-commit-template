// addJobToQueue.js
import { Queue } from 'bullmq';
import configModule from './config';
import setUpWorker from './worker';

const myQueue = new Queue('JOBS', {
  connection: configModule.CONNECTOR,
});
myQueue.setMaxListeners(Number(myQueue.getMaxListeners()) + 100);

setUpWorker();

const addJobToQueue = (data) => {
  return myQueue.add(data.jobName, data, configModule.DEFAULT_REMOVE_CONFIG);
};

export default addJobToQueue;