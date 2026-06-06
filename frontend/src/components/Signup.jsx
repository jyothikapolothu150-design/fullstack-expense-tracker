import { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post(
  "https://fullstack-expense-tracker-1-34rh.onrender.com/api/users/signup",
        {
          name,
          email,
          password,
        }
      );

      alert("Signup Successful");
    } catch (error) {
  console.log("ERROR:", error);
  console.log("DATA:", error.response?.data);

  alert(
    error.response?.data?.message ||
    "Signup Failed"
  );
}
  };

  return (
    <div>
      <h2 style={{ color: "#4f46e5" }}>
  Signup
</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />

      <button onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}

export default Signup;