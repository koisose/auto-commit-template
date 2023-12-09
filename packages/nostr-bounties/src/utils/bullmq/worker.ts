// setUpWorker.js
import { Worker } from 'bullmq';
import path from 'path';
import configModule from './config';
import {jobProcessor} from './processor'
let worker;

const processorPath = path.join(process.cwd(), 'processor.js');

const setUpWorker = async () => {
  const processor = await import(processorPath);
  
  worker = new Worker('JOBS', processor, {
    connection: configModule.CONNECTOR,
    autorun: true,
  });

  worker.on('active', (job) => {
    console.debug(`Processing job with id ${job.id}`);
  });

  worker.on('completed', (job, returnValue) => {
    console.debug(`Completed job with id ${job.id}`, returnValue);
  });

  worker.on('error', (failedReason) => {
    console.error(`Job encountered an error`, failedReason);
  });
};

export default setUpWorker;