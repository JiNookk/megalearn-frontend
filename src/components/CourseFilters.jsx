/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import styled from 'styled-components';
import useSkillTagStore from '../hooks/useSkillTagStore';
import Button from './ui/Button';
import PrimaryButton from './ui/PrimaryButton';

const RefreshButton = styled.button`
  display: block;
  background: none;
  border: 1px solid #d5dbe2;
  border-radius: 50%;
`;

const Tags = styled.ul`
  display: flex;
  align-items: center;
  /* width: 100%; */
  
  li{
    margin-inline-end: 1rem;
  }
  `;

const SkillButton = styled.input`
  padding: 1rem .75rem;
  margin-inline-end: 1rem;
  margin-block: .5rem;
  border: 1px solid #D3DADD;
  border-radius: 4px;
  background: ${(props) => (props.selected ? '#75E6C7' : '#FFFFFF')};
  color: ${(props) => (props.selected ? '#FFF' : '#000')};
`;

const Form = styled.form`
    display: flex;
    margin-inline-end: 1rem;
    padding-inline-start: .5rem;
    border: 1px solid #D3DADD;
    border-radius: .5rem;
    height: 2.5rem;
    
    input{
      border-radius: .5rem;
      border: none;
    }

    button{
      border: none;
      border-inline-start: 1px solid #D3DADD;
    }
`;

const Skills = styled.div`
  display: flex;
  justify-content: flex-start;

  > div {
    display: flex;
    margin-inline-end: 1rem;
  }
  
  ul{
    flex-wrap: wrap;

    li{
      margin-block: .3rem
    }
  }
`;

const Filters = styled.div`
  margin-block: .5rem 3rem;

  div{
    display: flex;
  }
`;

const SkillFilter = styled(PrimaryButton)`
  background: ${(props) => (props.filter.skill === props.value ? '#75E6C7' : '#FFFFFF')};
  color: ${(props) => (props.filter.skill === props.value ? '#FFF' : '#000')};
  `;

const CostFilter = styled(Button)`
  border: none;
  padding: .5rem 1rem;
  border-radius: 2rem;
  background: ${(props) => (props.filter.cost === props.value ? '#75E6C7' : '#e4e4e4')};
  color: ${(props) => (props.filter.cost === props.value ? '#FFF' : '#000')};
  `;

const LevelFilter = styled(PrimaryButton)`
  padding: .5rem 1rem;
  border-radius: 2rem;
  background: ${(props) => (props.filter.level === props.value ? '#75E6C7' : '#FFFFFF')};
  color: ${(props) => (props.filter.level === props.value ? '#FFF' : '#000')};
`;

export default function CourseFilters({ filter, setFilter }) {
  const skillTagStore = useSkillTagStore();

  const handleFilterSkill = (skill) => {
    setFilter({ ...filter, skill });
  };

  const handleSearchSkill = (event) => {
    event.preventDefault();

    const skill = event.target.skill.value;

    handleFilterSkill(skill);
  };

  const handleFilterCost = (cost) => {
    setFilter({ ...filter, cost });
  };

  const handleFilterLevel = (level) => {
    setFilter({ ...filter, level });
  };

  const handleRefreshFilter = () => {
    setFilter({});
  };

  return (
    <div>
      <Skills>
        <Form onSubmit={handleSearchSkill}>
          <label hidden htmlFor="search-skill">기술 검색</label>
          <input placeholder="기술 검색" name="skill" id="search-skill" type="text" />
          <button type="submit">
            <img src="/assets/images/search.png" alt="search" />
          </button>
        </Form>
        <Tags>
          {skillTagStore.skillTags
            .map((skill) => (
              <li key={skill.id}>
                <SkillFilter
                  filter={filter}
                  value={skill.content}
                  type="button"
                  onClick={() => handleFilterSkill(skill.content)}
                >
                  {skill.content}
                </SkillFilter>
              </li>
            ))}
        </Tags>
      </Skills>
      <Filters>
        <div>
          <Tags>
            {['전체', '무료', '유료']
              .map((cost, i) => (
                <li key={i}>
                  <CostFilter
                    filter={filter}
                    value={cost}
                    type="button"
                    onClick={() => handleFilterCost(cost)}
                  >
                    {cost}
                  </CostFilter>
                </li>
              ))}
          </Tags>
          <Tags>
            {['입문', '초급', '중급이상']
              .map((level, i) => (
                <li key={i}>
                  <LevelFilter
                    filter={filter}
                    value={level}
                    type="button"
                    onClick={() => handleFilterLevel(level)}
                  >
                    {level}
                  </LevelFilter>
                </li>
              ))}
          </Tags>
          <RefreshButton type="button" onClick={handleRefreshFilter}>
            ♻️
          </RefreshButton>
        </div>
      </Filters>
    </div>
  );
}
