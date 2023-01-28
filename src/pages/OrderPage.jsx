import { useEffect } from 'react';
import styled from 'styled-components';
import Padding from '../components/ui/Padding';
import SubTitle from '../components/ui/SubTitle';
import usePaymentStore from '../hooks/usePaymentStore';
import { dateFormat } from '../utils/DateFormat';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  padding-block: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid #dbdbdb;
  margin-block: 3rem;
  
  td{
    text-align: center;
  }
  
  th{
    font-size: 1.2rem;
    font-weight: bold;
  }

  th, td{
    padding: 1rem;
    border: 1px solid #dbdbdb;
  }
`;

const CourseTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: underline;
`;

export default function OrderPage() {
  const paymentStore = usePaymentStore();

  useEffect(() => {
    paymentStore.fetchMyPayments();
  }, []);

  return (
    <Container>
      <Padding>
        <SubTitle>
          내 구매 내역
        </SubTitle>
        <Table>
          <thead>
            <tr>
              <th>
                주문 번호
              </th>
              <th>
                주문 날짜
              </th>
              <th>
                상태
              </th>
              <th>
                주문명
              </th>
              <th>
                금액
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentStore.payments
              .map((payment) => (
                <tr key={payment.id}>
                  <td>
                    {payment.id}
                  </td>
                  <td>
                    {dateFormat.defaultFormat(payment.createdAt)}
                  </td>
                  <td>
                    결제완료
                  </td>
                  <td>
                    <CourseTitle>
                      {payment.courseTitle}
                    </CourseTitle>
                  </td>
                  <td>
                    ₩
                    {numberFormat(payment.cost)}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Padding>
    </Container>
  );
}
