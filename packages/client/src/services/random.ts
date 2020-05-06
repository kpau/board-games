
import {
  uniqueNamesGenerator, Config, adjectives, colors, animals, starWars,
} from 'unique-names-generator';

const noun = animals.concat(starWars);

const config: Config = {
  dictionaries: [adjectives, colors, noun],
  length: 3,
  separator: ' ',
  style: 'capital',
};

export function username(): string {
  return uniqueNamesGenerator(config);
}

export function number(): number {
  return Math.random();
}
