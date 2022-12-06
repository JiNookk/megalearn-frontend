export default function LoginPage() {
  return (
    <form>
      <div>
        <label htmlFor="input-userName">아이디</label>
        <input
          id="input-userName"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="input-password">비밀번호</label>
        <input
          id="input-password"
          type="password"
        />
      </div>
      <button type="submit">
        로그인
      </button>
    </form>
  );
}
