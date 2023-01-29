import { faker } from "@faker-js/faker"
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import moment from "moment"

interface IFakeMessage {
  timestamp: string;
  data: string;
}

export function addhours(date: Date, hours: number) {
  return moment(date).add(hours, "hours").toDate()
}

export function generateMessages(_msgCount: number): IFakeMessage[] {
  const obj = (): IFakeMessage => ({
    timestamp: faker.date.between(Date.now(), new Date()).toISOString(),
    data: faker.name.firstName('male')
  })

  return Array(_msgCount).fill(null).map(() => obj())
}
