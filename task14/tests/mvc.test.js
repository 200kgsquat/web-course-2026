// @vitest-environment node
import {it,expect,vi,afterEach} from 'vitest';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {SnakeModel}=require('../../task6/models/snake-model.js');
const {PostsModel}=require('../../task7/models/posts-model.js');
afterEach(()=>vi.unstubAllGlobals());
it('Snake blocks reverse direction and detects the wall', () => {
  const model = new SnakeModel(); model.reset(); model.changeDirection('left'); model.update(); expect(model.snake[0]).toEqual({x:9,y:10});
  model.snake=[{x:19,y:10},{x:18,y:10},{x:17,y:10}]; model.update(); expect(model.gameOver).toBe(true);
});
it('Snake grows on eating and places a new apple outside its body', () => {
  const model = new SnakeModel(); model.reset(); model.apple={x:9,y:10}; model.update();
  expect(model.score).toBe(1); expect(model.snake).toHaveLength(4);
  expect(model.snake.some(s=>s.x===model.apple.x&&s.y===model.apple.y)).toBe(false);
});
it('Posts model loads and filters server data without a View', async () => {
  vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:true,json:async()=>[{id:1,title:'Hello',body:'Text',userId:1}]}));
  const model = new PostsModel(); const loading=model.loadMore(); expect(model.loading).toBe(true); await loading;
  expect(model.finished).toBe(true); model.setQuery('HEL'); expect(model.visible).toHaveLength(1); model.setQuery('missing'); expect(model.visible).toEqual([]);
});
it('Posts model can retry after a network error without skipping a page', async () => {
  const fetch=vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ok:true,json:async()=>[]}); vi.stubGlobal('fetch',fetch);
  const model=new PostsModel(); await model.loadMore(); expect(model.failed).toBe(true); expect(model.page).toBe(1);
  await model.loadMore(); expect(model.failed).toBe(false); expect(model.finished).toBe(true); expect(fetch).toHaveBeenLastCalledWith(expect.stringContaining('_page=1'));
});
