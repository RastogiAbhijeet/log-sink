import { Logging, Severity } from "@google-cloud/logging";

export interface IWriteLogSyncConsumable<T> {
    logName: string;
    severity: Severity;
    payload: T
}

export class Logger {
    public static async writeLogSyncConsumable<T>({
        logName, severity,
        payload
    }) {
        const logging = new Logging()
        await logging.setProjectId()
        await logging.setDetectedResource()

        const log = logging.logSync(logName);
        const metadata = {
            // See: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
            severity: severity
        };


        // https://github.com/googleapis/nodejs-logging#writing-to-stdout
        const entry = log.entry(metadata, payload);
        log.write(entry);
    }
}