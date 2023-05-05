import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useCategoryStore from "../hooks/useCategoryStore";
import useCourseStore from "../hooks/useCourseStore";
import useRatingStore from "../hooks/useRatingStore";
import numberFormat from "../utils/numberFormat";

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  li {
    display: flex;
    flex-direction: column;
    margin-bottom: 2.5rem;
    max-width: 500px;

    h3 {
      font-size: 1.3rem;
      margin-block: 1rem;
    }

    p {
      margin-block: 0.2rem;
    }
  }
`;

const Rating = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
`;

export default function Courses() {
  const path = window.location.pathname.split("/")[2];

  const courseStore = useCourseStore();
  const ratingStore = useRatingStore();
  const categoryStore = useCategoryStore();

  const category = categoryStore.categories.reduce(
    (acc, categ) => ({
      ...acc,
      [categ.content]: categ.url ? `/${categ.url}` : "",
    }),
    {}
  );

  const getKey = (url) =>
    Object.keys(category).find((key) => category[key].substring(1) === url);

  return (
    <List>
      {courseStore.courses.length ? (
        courseStore.courses
          .filter((course) => course.status === "APPROVED")
          .filter(
            (course) => course.category === (getKey(path) || course.category)
          )
          .map((course) => (
            <li key={course.id} className="item">
              <Link to={`/courses/${course.id}`}>
                <Image
                  src={course.coverImage || "/assets/images/test.jpg"}
                  alt="course-items"
                />
                <h3>{course.title}</h3>
                <p>{course.instructor}</p>
                <Rating>
                  <ReactStars
                    edit={false}
                    value={
                      +(
                        ratingStore.ratings
                          .filter((rating) => rating.courseId === course.id)
                          .reduce((acc, cur) => acc + cur.rating, 0) /
                          ratingStore.ratings.filter(
                            (rating) => rating.courseId === course.id
                          ).length || 0
                      ).toFixed(2)
                    }
                  />
                  (
                  {
                    ratingStore.ratings.filter(
                      (rating) => rating.courseId === course.id
                    ).length
                  }
                  )
                </Rating>
                <p>
                  {course.price ? `₩${numberFormat(course.price)}` : "무료"}
                </p>
              </Link>
            </li>
          ))
      ) : (
        <li>
          <p>
            <strong>🙈 검색 결과가 없어요! 🙊</strong>
          </p>
          <p>필터를 다시 적용해보시거나 카테고리를 이동해보세요</p>
        </li>
      )}
    </List>
  );
}
