import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";
import { setAuthenticated } from "../lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
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
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <div className="field-group">
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              id="email"
              className={`field ${errors.email ? "error" : ""}`}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error-message" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="field-group">
            <div className="password-wrap">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                className={`field ${errors.password ? "error" : ""}`}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="error-message" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <a href="#forgot">FORGOT PASSWORD?</a>
          <button className="login-submit">LOG IN</button>
        </form>
      </div>
    </section>
  );
}
