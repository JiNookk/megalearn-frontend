# Megalearn

## 프로젝트 소개
megalearn은 누구나 간편하게 강의를 시청하고 공유할 수 있는데 초점을 두고 만든 웹 서비스 입니다.

### 배포 URL
- 사용자 : [https://megalearn-frontend.fly.dev/](https://megalearn-frontend.fly.dev/)
- 어드민 : [https://megalearn-admin.fly.dev/](https://megalearn-admin.fly.dev/)

### Github
- 서버 : [https://github.com/JiNookk/megalearn-backend](https://github.com/JiNookk/megalearn-backend)
- 사용자 프론트 : [https://github.com/JiNookk/megalearn-frontend](https://github.com/JiNookk/megalearn-frontend)
- 어드민 프론트 : [https://github.com/JiNookk/megalearn-admin](https://github.com/JiNookk/megalearn-admin)

## 개발 기간
- 2022.11.26 ~ 2022.01.20
- 일주일 간격으로 8번의 스프린트를 진행했습니다.
<br>

## 기술 스택
### Frontend
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"></a>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">


<br>

## 주요 기능

- 강의 시청
- 질문 등록
- 노트 작성
- 강의 등록(판매)
- 문의 작성
- 강의 판매
- 강의 결제
- 리뷰 작성
- 로그인 / 회원가입

<br>

## 아키텍쳐
Flux Architecture를 참고했습니다.

1. View - Action
2. Dispatcher
3. Store

## 프론트엔드 프로젝트 특징

*#JavaScript, React.js, HTML/CSS*

### **전역 상태관리**

flux architecture의 store 계층을 이용하여 컴포넌트들의 상태를 전역적으로 관리하였습니다. store를 사용하면서 고민한 부분은 다음과 같습니다.

**상태들 간의 관심사 분리**

전역으로 사용하기 편하도록 하나의 Store에는 하나의 관심사만이 존재하도록 로직을 구성하였습니다. 그 결과 필요한 컴포넌트에서 필요한 상태만을 독립적으로 불러와 사용할 수 있었습니다.

**pub-sub 구조로 리렌더링**

store에서 관리하는 상태가 변경될때 화면을 갱신시키기 위해 pub-sub구조를 사용하였습니다.

useState를 리스너로 등록해서 상태가 변경될 때마다 useState를 실행시키는 로직을 사용했습니다.

### **테스트 코드**

다음 두 가지를 고려해서 jest를 이용한 단위테스트를 도입했습니다.

**비즈니스 로직 검증**

flux 아키텍처에서 비즈니스 로직이 전부 store에 존재했기 때문에 핵심 로직을 검증해야할 필요가 있었습니다. 하지만 store에서 api를 필요로 하는 부분이 존재했기 때문에 실제 테스트에 어려움을 겪었습니다.

msw를 도입해서 테스트용 서버를 만들어 주었고, 이를 이용해 성공적으로 store의 비즈니스 로직을 테스트 할 수 있었습니다.

**컴포넌트 검증**

화면을 직접 보면서 컴포넌트 작업을 하다보니 생각보다 시간이 많이 소요 되었습니다. 

jest의 watchAll기능을 통해 컴포넌트가 변경될때마다 테스트를 진행하여 화면을 보면서 컴포넌트 작업을 하는데 드는 시간을 줄일 수 있었습니다.

### 인수테스트

다음 두 가지를 고려하여 인수테스트를 도입했습니다.

**스펙 작성**

유저 스토리로 작성한 스펙 하나하나를 codeceptjs를 이용해서 인수테스트로 옮겼습니다.

작성한 코드가 스펙을 만족하는지 자동화 된 인수테스트를 이용해서 빠르게 검증할 수 있었습니다.

**작업의 끝 명시**

특정 스펙을 만족시키려고 작업하다보면 작업의 끝이 어디인지 정해놓은 선이 없어서 방황한 적이 많았습니다.

스프린트를 시작할 때 인수테스트를 작성하면서 스프린트 작업의 끝을 명시할 수 있어 더 효율적으로 작업할 수 있었습니다.
