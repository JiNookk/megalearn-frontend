import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCourseFormStore from '../hooks/useCourseFormStore';
import useCourseStore from '../hooks/useCourseStore';
import SubTitle from './ui/SubTitle';
import Title from './ui/Title';

const Container = styled.div`
  flex: 1;
  background: white;
  padding: 2.5rem 1.25rem;
  border: 1px solid #D3DADD;
  border-radius: 4px;

  >p{
    margin-block: 1rem;
    color: #ABB0B5;
  }

  button{
    display: flex;
    align-items: center;
    background: none;
    border: none;
  }
`;

const Guide = styled.div`
  padding: 1rem;
  background: #F7F7F7;
  margin-block: 2.5rem;
  
  h3{
    margin-bottom: .5rem;
  }

  div{
    margin-block: 1.5rem;
  }

  p{
    margin-block: .5rem
  }
`;

const InputCoverImage = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.25rem;
  border: 1px solid #D9D9D9;
  margin-block: 2rem;
`;

const List = styled.ul`
  list-style: disc;
  padding-inline: 1rem;
  color: #3E4042;

  li{
    margin-block: .7rem;
  }
`;

const Image = styled.div`
  height: 100px;
  width: 250px;
  background: #D9D9D9;

  img{
    width: 100%;
    height: 100%;
  }
`;

const LinkWrapper = styled.div`
  margin-block: 2rem;
  text-align: center;

  a{
    display: inline-block;
    padding: 1rem .5rem;
    border: 1px solid #D3DADD;
    border-radius: 4px;
  }
`;

export default function UploadCoverImage() {
  const courseId = window.location.pathname.split('/')[2];

  const courseFormStore = useCourseFormStore();
  const courseStore = useCourseStore();

  const handleUpload = async (file) => {
    await courseFormStore.changeThumbnailPath(file);

    const { thumbnail } = courseFormStore;

    courseStore.update({ courseId, imagePath: thumbnail });
  };

  useEffect(() => {
    courseStore.fetchCourse({ courseId })
      .then(() => {
        courseFormStore.changeThumbnail(courseStore.course.coverImage);
        console.log(courseFormStore.thumbnail);
      });
  }, []);

  return (
    <Container>
      <p>
        강의제작
      </p>
      <Title>
        커버 이미지
      </Title>
      <Guide>
        <div>
          <SubTitle>
            강의 커버 이미지 (썸네일) 업로드
          </SubTitle>
          <p>
            강의를 대표하는 이미지를 업로드해주세요.
          </p>
        </div>
      </Guide>
      <hr />
      <InputCoverImage>
        <div>
          <List>
            <li>
              이미지 크기: 1200 x 781(px)
            </li>
            <li>
              jpg, png 파일만 업로드 가능합니다.
            </li>
            <li>
              한글이 들어간 디자인은 쓸 수 없습니다.
            </li>
          </List>
          <label hidden htmlFor="input-thumbnail">파일 선택</label>
          <input
            id="input-thumbnail"
            type="file"
            placeholder="커버 이미지를 선택해주세요."
            onInput={(e) => handleUpload(e.target.files[0])}
          />
        </div>
        <Image>
          <img src={courseFormStore.thumbnail || '/assets/images/test.jpg'} alt="" />
        </Image>
      </InputCoverImage>
      <LinkWrapper>
        <Link to={`/courses/${courseId}/edit/course_setting`}>
          저장 후 다음이동
        </Link>
      </LinkWrapper>
    </Container>
  );
}
