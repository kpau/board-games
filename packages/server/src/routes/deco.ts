import {
  route, arg, ActionResult, initRoutes, get, param, post, put, body, query,
} from '@bgames/decorouter';

interface Model {
  id: number;
  value: string;
}

@route('/test')
class TestController {
  constructor(private data: Model[] = []) {}

  @get()
  getAll() {
    return this.data;
  }

  @get('/id/:id')
  getOne(
    @param('id') id: number,
  ) {
    return ActionResult.Ok(this.data[id]);
  }

  @post('/create')
  create(
    @body() item: Model,
  ) {
    this.data.push(item);
    console.log(`new ${JSON.stringify(item)}`);
    return this.data.length;
  }

  @put('/:id')
  update(
    @param('id') id: number,
    @body() item: Model,
  ) {
    this.data[id] = item;
    console.log(`save ${id} - ${JSON.stringify(item)}`);
  }

  @get('/filter')
  filter(
    @query('cont') contains: string,
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
