import { useInterval } from 'usehooks-ts';
import useCourseFormStore from '../hooks/useCourseFormStore';
import useCourseStore from '../hooks/useCourseStore';

export default function CourseSetting() {
  const courseId = window.location.pathname.split('/')[2];

  const courseFormStore = useCourseFormStore();
  const courseStore = useCourseStore();

  const handleChangePrice = (price) => {
    courseFormStore.changePrice(price);
  };

  useInterval(() => courseFormStore.validatePrice(), 1000);

  const handleSubmit = (event) => {
    const updated = ['price'].reduce((acc, key) => ({
      ...acc,
      [key]: courseFormStore[key],
    }), {});

    courseStore.update({ courseId, ...updated });

    event.preventDefault();
  };

  return (
    <article>
      <h2>
        설정
      </h2>
      <h3>
        강의설정
      </h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label hidden htmlFor="input-price">가격 설정</label>
          <input
            id="input-price"
            type="number"
            placeholder="가격을 설정해주세요"
            value={courseFormStore.price}
            onChange={(e) => handleChangePrice(e.target.value)}
          />
        </div>
        <button type="submit">
          저장 후 다음 이동
        </button>
      </form>
    </article>
  );
}
