import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";
import { setAuthenticated } from "../lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setAuthenticated();
    navigate("/dashboard");
  };

  return (
    <section className="login-page">
      <div className="login-art">
        <Logo />
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
        <div className="mobile-logo">
          <Logo />
        </div>
        <form
          className="login-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}
        >
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <input className="field" type="email" placeholder="Email" />
          <div className="password-wrap">
            <input
              className="field"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <button type="button" onClick={() => setShowPassword((value) => !value)}>
              SHOW
            </button>
          </div>

          <a href="#forgot">FORGOT PASSWORD?</a>
          <button className="login-submit">LOG IN</button>
        </form>
      </div>
    </section>
  );
}
