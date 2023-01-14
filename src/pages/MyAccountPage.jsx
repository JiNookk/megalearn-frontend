import styled from 'styled-components';
import DefaultBanner from '../components/banners/DefaultBanner';
import DashBoard from '../components/DashBoard';
import MyCourses from '../components/MyCourses';
import MyNotes from '../components/MyNotes';
import MyPosts from '../components/MyPosts';

import MyAccountTab from '../components/tabs/MyAccountTab';
import WishList from '../components/WishList';

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr;

  padding: 2rem;
`;

export default function MyAccountPage() {
  const path = window.location.pathname.split('/')[2];

  const categories = {
    'my-courses': '내학습',
    'my-notes': '강의노트',
    'my-posts': '작성한 게시글',
    likes: '좋아요',
  };

  const components = {
    dashboard: DashBoard,
    'my-courses': MyCourses,
    'my-notes': MyNotes,
    'my-posts': MyPosts,
    likes: WishList,
  };

  const Component = components[path];

  return (
    <div>
      <DefaultBanner title={categories[path]} />
      <Main>
        <MyAccountTab />
        <Component />
      </Main>
    </div>
  );
}
