/* eslint-disable @typescript-eslint/explicit-function-return-type */
import action from './action';

function get(path = '/') {
  return action('get', path);
}

function put(path = '/') {
  return action('put', path);
}

function post(path = '/') {
  return action('post', path);
}

function del(path = '/') {
  return action('delete', path);
}

function patch(path = '/') {
  return action('patch', path);
}

export {
  get, put, post, del as delete, patch,
};
