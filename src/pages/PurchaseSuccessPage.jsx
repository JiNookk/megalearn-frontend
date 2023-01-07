import { useEffect } from 'react';
import Container from '../components/ui/Container';
import usePaymentStore from '../hooks/usePaymentStore';

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
      결제 성공!
    </Container>
  );
}
