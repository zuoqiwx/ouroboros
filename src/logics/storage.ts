import AsyncStorage from "@react-native-async-storage/async-storage";

import { Hexagram } from "./models";

export type Record = {
  name: string;
  time: Date;
  hexagram: Hexagram;
};

type Data = Record;

async function setData(key: string, value: Data): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("setData:", error);
  }
  return false;
}

async function getData(key: string): Promise<Data | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? (JSON.parse(value) as Data) : null;
  } catch (error) {
    console.error("getData:", error);
  }
  return null;
}

async function getAllKeys(): Promise<string[]> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.slice();
  } catch (error) {
    console.error("getAllKeys:", error);
  }
  return [];
}

type PairNullable = [string, Data | null];
export type Pair = [string, Data];

async function batchGetData(keys: string[]): Promise<PairNullable[]> {
  try {
    const pairs = await AsyncStorage.multiGet(keys);
    return pairs.map(([key, value]) => [
      key,
      value ? (JSON.parse(value) as Data) : null,
    ]);
  } catch (error) {
    console.error("batchGetData:", error);
  }
  return [];
}

async function batchDeleteData(keys: string[]): Promise<boolean> {
  try {
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    console.error("batchDeleteData:", error);
  }
  return false;
}

export function asRecordKey(key: string): string {
  return `record-${key}`;
}

export function isRecordKey(key: string): boolean {
  return key.match(/^record-.*/g) !== null;
}

export async function setRecord(record: Record): Promise<boolean> {
  const key = asRecordKey(record.time.getTime().toString());
  return await setData(key, record);
}

async function getAllRecordKeys(): Promise<string[]> {
  const keys = await getAllKeys();
  return keys.filter((key) => isRecordKey(key));
}

export async function getAllRecordPairs(): Promise<Pair[]> {
  const recordKeys = await getAllRecordKeys();
  const recordPairs = (await batchGetData(recordKeys)) as Pair[];
  return recordPairs.map(([key, data]: Pair) => {
    return [
      key,
      {
        ...data,
        hexagram: Hexagram.fromObject(data.hexagram),
      } as Record,
    ];
  });
}

export async function deleteAllRecordPairs(): Promise<boolean> {
  const recordKeys = await getAllRecordKeys();
  const success = await batchDeleteData(recordKeys);
  return success;
}
