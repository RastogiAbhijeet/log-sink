import express from 'express';
import { generateMessages } from "@init/lib/fake-messages";
import { Logger } from './app/logger';
import { Severity } from '@google-cloud/logging';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.post("/fake-results", (req, res) => {

  const payloads = generateMessages(10);

  payloads.map(payload => {
    Logger.writeLogSyncConsumable<object>({
      severity: Severity.info,
      logName: "log-sink",
      payload
    })
  })

  res.send(payloads)
})

app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});



