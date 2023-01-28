import { useEffect } from 'react';
import styled from 'styled-components';
import Padding from '../components/ui/Padding';
import SubTitle from '../components/ui/SubTitle';
import usePaymentStore from '../hooks/usePaymentStore';

const Container = styled.div`
  flex: 1;
  padding-block: 2rem;
  background: #f5f5f5;
  text-align: center;

  p{
    margin-block: 1rem;
  }
`;

const Items = styled.ul`
  margin-block: 1rem;

  li{
    display: flex;
    padding: .5rem;
    background: white;
    text-align: start;

    p{
      margin-block: .5rem;
    }

    a{
      display: inline-block;
      padding: .7rem 1rem;
      border: 1px solid #dbdbdb;
      border-radius: 4px;
    }
  }
`;

const Image = styled.img`
  display: block;
  height: 100px;
  margin-right: 1rem;
`;

const Bill = styled.div`
  padding  : 1rem;
  background: white;
  margin-bottom: 2rem;
`;

export default function PurchaseSuccessPage() {
  const { location } = window;
  const pgToken = location.search.substring(1).split('=')[1];

  const paymentStore = usePaymentStore();

  useEffect(() => {
    if (pgToken) {
      paymentStore.requestPurchase({ pgToken });
    }
  }, []);

  return (
    <Container>
      <Padding>
        <SubTitle>
          주문완료
        </SubTitle>
        <p>
          축하합니다.🎉 이제 새로운 지식을 습득해 보세요.
        </p>
        {/* <Items>
          {paymentStore.payments
            .map((payment) => (
              <li key={payment.id}>
                <Image src="/assets/images/test.jpg" alt="item" />
                <div>
                  <p>
                    {payment.courseTitle}
                  </p>
                  <p>
                    ₩
                    {numberFormat(payment.cost)}
                  </p>
                  <Link to={`/courses/${payment.courseId}`}>
                    강의로 가기
                  </Link>
                </div>
              </li>
            ))}
        </Items>
        <Bill>
          <Title>
            총계 ₩
            {numberFormat(77000)}
          </Title>
        </Bill> */}
        <p>
          좋은 지식의 구매는 더 좋은 지식 창출을 위한 바탕으로 쓰입니다.
        </p>
        <p>
          함께해 주셔서 감사합니다. 🙇🏻‍♂️🙇🏻‍♀️
        </p>
      </Padding>
    </Container>
  );
}
