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

          <p>
            Don't have an account?
          </p>

          <button
            onClick={() =>
              setShowLogin(false)
            }
          >
            Signup
          </button>
        </>
      ) : (
        <>
          <Signup />

          <p>
            Already have an account?
          </p>

          <button
            onClick={() =>
              setShowLogin(true)
            }
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default TestLogin;