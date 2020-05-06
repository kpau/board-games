
import {
  uniqueNamesGenerator, Config, adjectives, colors, animals, starWars,
} from 'unique-names-generator';
import greetings from 'greetings';

const noun = animals.concat(starWars);

const config: Config = {
  dictionaries: [adjectives, colors, noun],
  length: 3,
  separator: ' ',
  style: 'capital',
};

function username(): string {
  return uniqueNamesGenerator(config);
}

function greeting(name?: string): string {
  if (name) {
    return `${greetings()}, ${name}`;
  }
  return greetings();
}

function number(): number {
  return Math.random();
}

export default { username, greeting, number };
