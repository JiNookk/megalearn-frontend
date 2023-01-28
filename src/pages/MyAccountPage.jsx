import styled from 'styled-components';
import DefaultBanner from '../components/banners/DefaultBanner';
import DashBoard from '../components/DashBoard';
import MyCourses from '../components/MyCourses';
import MyNotes from '../components/MyNotes';
import MyPosts from '../components/MyPosts';

import MyAccountTab from '../components/tabs/MyAccountTab';
import Padding from '../components/ui/Padding';
import WishList from '../components/WishList';

const Main = styled.div`
  padding-block: 2rem;

  >div{
    display: grid;
    grid-template-columns: 1fr 7fr;
  }
`;

export default function MyAccountPage() {
  const path = window.location.pathname.split('/')[2];

  const categories = {
    dashboard: '대시보드',
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
        <Padding>
          <MyAccountTab />
          <Component />
        </Padding>
      </Main>
    </div>
  );
}
