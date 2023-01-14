import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Category = styled.ul`
    li{
      padding-inline: 1rem;
      margin-block: 1rem;
    }
`;

const CategoryGroup = styled.h3`
   font-size: .9rem;
   color: #d6dbde;
`;

export default function MyAccountTab() {
  return (
    <nav>
      <CategoryGroup>
        HOME
      </CategoryGroup>
      <Category>
        <li>
          <Link to="/account/dashboard">
            대시보드
          </Link>
        </li>
      </Category>
      <CategoryGroup>
        학습 관리
      </CategoryGroup>
      <Category>
        <li>
          <Link to="/account/my-courses">
            내 학습
          </Link>
        </li>
        <li>
          <Link to="/account/my-notes">
            강의노트
          </Link>
        </li>
        <li>
          <Link to="/account/my-posts">
            작성한 게시글
          </Link>
        </li>
      </Category>
      <CategoryGroup>
        수강신청 관리
      </CategoryGroup>
      <Category>
        <li>
          <Link to="/carts">
            수강바구니
          </Link>
        </li>
        <li>
          <Link to="/account/likes">
            좋아요
          </Link>
        </li>
        <li>
          <Link to="/my-orders">
            구매내역
          </Link>
        </li>
      </Category>
    </nav>
  );
}
