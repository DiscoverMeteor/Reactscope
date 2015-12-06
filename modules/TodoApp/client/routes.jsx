import TodoApp from './TodoApp';
import TodoMain from './TodoMain';

import PostList from './components/PostList';
import PostSubmit from './components/PostSubmit';
import PostPage from './components/PostPage';
import PostEdit from './components/PostEdit';
import About from './components/About';

export default {
  path: '/',
  component: TodoApp,
  indexRoute: { component: PostList },
  childRoutes: [
    { path: 'submit', component: PostSubmit },
    { path: 'about', component: About },
    { path: 'post/:postId', component: PostPage},
    { path: 'edit/:postId', component: PostEdit}
  ]
};
