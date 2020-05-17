import {
  route, action, arg, ActionResult, initRoutes,
} from '@bgames/decorouter';

interface Model {
  id: number;
  value: string;
}

@route('/test')
class TestController {
  constructor(private data: Model[] = []) {}

  @action('get')
  getAll() {
    return this.data;
  }

  @action('get', '/id/:id')
  getOne(
    @arg('param', 'id', true, parseInt) id: number,
  ) {
    return ActionResult.Ok(this.data[id]);
  }

  @action('post', '/create')
  create(
    @arg('body', '') item: Model,
  ) {
    this.data.push(item);
    console.log(`new ${JSON.stringify(item)}`);
    return this.data.length;
  }

  @action('put', 'id/:id')
  update(
    @arg('param', 'id', true, parseInt) id: number,
    @arg('body', '') item: Model,
  ) {
    this.data[id] = item;
    console.log(`save ${id} - ${JSON.stringify(item)}`);
  }

  @action('get', '/filter')
  filter(
    @arg('query', 'cont') contains: string,
  ) {
    console.log(contains);
    return this.data.filter((i) => i.value.indexOf(contains) >= 0);
  }
}

const data: Model[] = [
  { id: 0, value: 'test' },
  { id: 1, value: 'kris' },
  { id: 1, value: 'kris&adi' },
];
const testCtrl = new TestController(data);

const testRouter = initRoutes(testCtrl);
export default testRouter;
