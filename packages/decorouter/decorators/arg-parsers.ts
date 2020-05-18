import { ArgParser } from '../config';

export const string: ArgParser<string> = (value: string): string => value;

export const number: ArgParser<number> = (value: string): number => parseFloat(value);

export const boolean: ArgParser<boolean> = (value: string) => value.toLowerCase() === 'true';

export const date: ArgParser<Date> = (value: string) => new Date(value);

export const json = <T>(value: string): T => JSON.parse(value) as T;
