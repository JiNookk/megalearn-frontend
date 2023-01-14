import { useEffect } from 'react';
import styled from 'styled-components';
import SubTitle from '../components/ui/SubTitle';
import Image from '../components/ui/Image';
import PrimaryButton from '../components/ui/PrimaryButton';
import SecondaryButton from '../components/ui/SecondaryButton';
import SideBar from '../components/ui/SideBar';
import Title from '../components/ui/Title';
import useCartStore from '../hooks/useCartStore';
import useCourseStore from '../hooks/useCourseStore';
import usePaymentStore from '../hooks/usePaymentStore';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px; 
  gap: 3rem;

  padding: 2rem 3rem;
`;

const Carts = styled.article`
    
`;

const Utility = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-block: 1rem;
  border-bottom: 1px solid black;
  
  div{
    display: flex;
    align-items: center;
  }
`;

const List = styled.ul`
  li{
    display: flex;
    justify-content: space-between;
    padding-block: 1.5rem;
    border-block-end: 1px solid #e6e6e6;

    > div{
      display: flex;
      align-items: center;
    }
  }
`;

const ItemTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-block-end: .6rem;
`;

const Instructor = styled.p`
  color: gray;
`;

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  padding-inline-start: 4rem;
`;

const DeleteItemButton = styled.button`
  font-size: 1.5rem;
  font-weight: 100;
  height: 100%;
  padding-inline-end: 1.2rem;
  border: none;
  border-inline-end: 1px solid #e6e6e6;
  color:gray;
  background: none;
`;

const PurchaseSideBar = styled.aside`
    > div  {
      margin-block-end: .5rem;
    }

    button{
      width: 100%;

      margin-block-start: 1.3rem;
      padding: .8rem 2rem;
    }
`;

const Information = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default function CartPage() {
  const cartStore = useCartStore();
  const paymentStore = usePaymentStore();
  const courseStore = useCourseStore();

  // 만약 안체크 되어 있다면? => 전체 체크
  // 체크되어있다면 -> 전체 체크 해제
  // 다른애들이 다 체크 되어있다면 => 체크
  const handleSelectAll = (event) => (
    event.target.checked
      ? cartStore.checkAll()
      : cartStore.unCheckAll()
  );

  const handleDeleteSelected = () => {
    const selected = cartStore.cart.items
      .filter((item) => item.checked)
      .map((item) => item.productId);

    cartStore.removeItems({ productIds: selected });
  };

  const handleDeleteCartItem = (productId) => {
    cartStore.removeItems({ productIds: [productId] });
  };

  const handlePurchase = async () => {
    const courseIds = cartStore.cart.items
      .filter((item) => item.checked)
      .map((item) => item.productId);

    await paymentStore.requestPaymentUrl({ courseIds });

    window.location.href = paymentStore.url;
  };

  useEffect(() => {
    courseStore.fetchCourses();
    cartStore.fetchCart();
  }, []);

  return (
    <Container>
      <Carts>
        <Title>
          수강바구니
        </Title>
        <Utility>
          <div>
            <input
              id="check-all"
              type="checkbox"
              checked={cartStore.cart.items
                .reduce((prevChecked, item) => prevChecked && item.checked, true)}
              onChange={handleSelectAll}
            />
            <label htmlFor="check-all">
              전체선택
            </label>
            <p>
              {cartStore.cart.items
                .filter((item) => item.checked)
                .length}
              /
              {cartStore.cart.items.length}
            </p>
          </div>
          <PrimaryButton type="button" onClick={handleDeleteSelected}>
            선택삭제
          </PrimaryButton>
        </Utility>
        <List>
          {cartStore.cart.items
            .map((item) => (
              courseStore.courses
                .filter((course) => course.id === item.productId)
                .map((course) => (
                  <li key={item.productId}>
                    <div>
                      <label hidden htmlFor="check-item">
                        선택
                      </label>
                      <input
                        id="check-item"
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => cartStore.checkItem({ id: item.id })}
                      />
                      <Image src="/assets/images/test.jpg" alt="" />
                      <div key={course.id}>
                        <ItemTitle>
                          {course.title}
                        </ItemTitle>
                        <Instructor>
                          {course.instructor}
                        </Instructor>
                      </div>
                    </div>
                    <div>
                      <DeleteItemButton
                        type="button"
                        onClick={() => handleDeleteCartItem(item.productId)}
                      >
                        𝖷
                      </DeleteItemButton>
                      <Price>
                        {numberFormat(course.price)}
                        원
                      </Price>
                    </div>
                  </li>
                ))
            ))}
        </List>
      </Carts>
      <PurchaseSideBar>
        <SideBar>
          <SubTitle>
            구매자정보
          </SubTitle>
          <Information>
            <dt>
              이름
            </dt>
            <dd>
              오진욱
            </dd>
            <dt>
              이메일
            </dt>
            <dd>
              ojw0828@naver.com
            </dd>
            <dt>
              휴대폰번호
            </dt>
            <dd>
              010-8556-8965
            </dd>
          </Information>
        </SideBar>
        <SideBar>
          <Information>
            <dt>
              총 결제금액
            </dt>
            <dd>
              {numberFormat(cartStore.cart?.items
                .filter((item) => item.checked)
                .map((item) => (courseStore.courses
                  .find((course) => course.id === item.productId)
                  .price))
                .reduce((a, b) => a + b, 0))}
              원
            </dd>
          </Information>
          <SecondaryButton type="button" onClick={handlePurchase}>
            결제하기
          </SecondaryButton>
        </SideBar>
      </PurchaseSideBar>
    </Container>
  );
}
