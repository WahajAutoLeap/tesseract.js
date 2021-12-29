const createWorker = require('./createWorker');

const recognize = async (image, langs, options, workerParams) => {
  const worker = createWorker(options);
  await worker.load();
  await worker.loadLanguage(langs);
   await worker.setParameters(workerParams);
  await worker.initialize(langs);
  return worker.recognize(image)
    .finally(async () => {
      await worker.terminate();
    });
};

const detect = async (image, options) => {
  const worker = createWorker(options);
  await worker.load();
  await worker.loadLanguage('osd');
  await worker.initialize('osd');
  return worker.detect(image)
    .finally(async () => {
      await worker.terminate();
    });
};

module.exports = {
  recognize,
  detect,
};
