import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

function TestLogin() {
  const [showLogin, setShowLogin] =
    useState(true);

  return (
    <div>
      {showLogin ? (
        <>
          <Login />

          <p className="switch-text">
  Don't have an account?
</p>

<button
  className="switch-btn"
  onClick={() => setShowLogin(false)}
>
  Create Account
</button>
        </>
      ) : (
        <>
          <Signup />
<p className="switch-text">
  Already have an account?
</p>

<button
  className="switch-btn"
  onClick={() => setShowLogin(true)}
>
  Login
</button>
        </>
      )}
    </div>
  );
}

export default TestLogin;