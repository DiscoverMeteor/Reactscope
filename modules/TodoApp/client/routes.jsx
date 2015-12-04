import TodoApp from './TodoApp';
import TodoMain from './TodoMain';

import PostSubmit from './components/PostSubmit';
import About from './components/About';

export default {
  path: '/',
  component: TodoApp,
  indexRoute: { component: TodoMain },
  childRoutes: [
    { path: 'submit', component: PostSubmit },
    { path: 'about', component: About }
  ]
};
