import * as vm from '@bgames/shared/vm';
import { Method } from '@bgames/shared/rest';
import { api } from '../config.json';

type Path = keyof typeof api.parths;

const getUrl = (path: Path, id?: string): string => `${api.url}/${api.parths[path]}/${id || ''}`;

const failedResponseMsg = (res: Response, method: string, ...extra: any[]): string => [
  method,
  res.url,
  res.status,
  res.statusText,
  ...extra.map((e) => JSON.stringify(e)),
].join('-');

async function call<TBody = null, TResult = void>(url: string, method: Method = 'get', body?: TBody): Promise<TResult> {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request failed! ${failedResponseMsg(response, method)}`);
  }

  const contentType = response.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/json')) {
    return response.text() as unknown as Promise<TResult>;
  }

  return response.json();
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function rest(path: Path) {
  async function create<T extends vm.ViewModel>(item: T): Promise<T> {
    if (item.id !== undefined) {
      throw Error(`Item alreay have ID! ${item.id}`);
    }

    const url = getUrl(path);

    const id = await call<T, string>(url, 'post', item);
    const newItem = { ...item, id };
    return newItem;
  }

  async function update<T extends vm.ViewModel>(item: T): Promise<T> {
    if (item.id === undefined) {
      throw Error(`Item does not have ID! ${item.id}`);
    }

    const url = getUrl(path, item.id);

    await call(url, 'put', item);
    return { ...item };
  }

  async function createOrUpdate<T extends vm.ViewModel>(item: T): Promise<T> {
    return item.id === undefined
      ? create(item)
      : update(item);
  }

  async function del<T extends vm.ViewModel>(item: T | string): Promise<void> {
    let id: string;
    if (typeof item === 'string') {
      id = item;
    } else {
      if (item.id === undefined) {
        throw Error(`Item does not have ID! ${item.id}`);
      }
      id = item.id;
    }

    const url = getUrl(path, id);

    return call(url, 'delete');
  }

  async function getById<T extends vm.ViewModel>(id: string): Promise<T> {
    const url = getUrl(path, id);

    return call<null, T>(url, 'get');
  }

  async function getAll<T extends vm.ViewModel>(): Promise<T[]> {
    const url = getUrl(path);

    return call<null, T[]>(url, 'get');
  }

  return {
    create, update, createOrUpdate, getById, getAll, delete: del,
  };
}

export default rest;
