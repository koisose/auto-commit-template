// jobProcessor.js
const jobProcessor = async (job) => {
  await job.log(`Started processing job with id ${job.id}`);
  // TODO: do your CPU intense logic here
  await extractCSVData(job?.data);

  await job.updateProgress(100);
  return 'DONE';
};

export default jobProcessor;