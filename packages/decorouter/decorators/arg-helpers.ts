import { ArgParser } from '../config';
import arg from './arg';
import { string, number, json } from './arg-parsers';

function body<T>(
  parse: ArgParser<T> = json,
  required = true,
): ParameterDecorator {
  return arg('body', '', parse, required);
}

function query<T extends string = string>(
  paramName: string,
): ParameterDecorator;
function query<T>(
  paramName: string,
  parser: ArgParser<T>,
  required?: boolean,
): ParameterDecorator;
function query(
  paramName: string,
  parser: ArgParser<string> = string,
  required = true,
): ParameterDecorator {
  return arg('query', paramName, parser, required);
}

function param<T extends number = number>(
  paramName: string,
): ParameterDecorator;
function param<T>(
  paramName: string,
  parser: ArgParser<T>,
  required?: boolean,
): ParameterDecorator;
function param(
  paramName: string,
  parser: ArgParser<number> = number,
  required = true,
): ParameterDecorator {
  return arg('param', paramName, parser, required);
}

export { body, query, param };
