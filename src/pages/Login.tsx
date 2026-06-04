import { useState } from "react";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [show, setShow] = useState(false);

  return (
    <section className="login-page">
      <div className="login-art">
        <div className="logo"><span>▣</span> lendsqr</div>
        <div className="illustration">
          <div className="person" />
          <span className="bubble bubble-one" />
          <span className="bubble bubble-two" />
          <span className="shape shape-one" />
          <span className="shape shape-two" />
          <span className="shape shape-three" />
        </div>
      </div>
      <div className="login-panel">
        <form className="login-form" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <h1>Welcome!</h1><p>Enter details to login.</p>
          <input className="field" placeholder="Email" type="email" />
          <div className="password-wrap"><input className="field" placeholder="Password" type={show ? "text" : "password"} /><button type="button" onClick={() => setShow(!show)}>SHOW</button></div>
          <a href="#forgot">FORGOT PASSWORD?</a>
          <button className="login-submit">LOG IN</button>
        </form>
      </div>
    </section>
  );
}