"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);


  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile")

    } catch (error: any) {
      setError(true)
      console.log("Failed to login" , error.message);
      toast.error(error.message)
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    }else {
      setButtonDisabled(true);
    }
  }, [user])
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      
         {error ? (
         <div> <h3 className="text-center m-2 text-red-500">Invalid Email or password</h3></div>
        ) : ''}
      
      <h1 className="text-center text-white text-2xl">{loading ? "processing" : "Login"}</h1>
      <hr />
      <label htmlFor="password">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:bg-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:bg-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <Link style={{marginBottom: "34px", marginLeft: "85px"}}  href="/forgotpassword">Forgot Passord</Link>

      <button
        onClick={onLogin}
        style={{
          width: "120px",
          height: "40px",
          borderWidth: "1px",
          borderColor: "white",
          color: "white",
          borderRadius: "5px",
          margin: "10px",
          padding: "2px",
        }}
      >
        {buttonDisabled ? "No login" : "Login"}
      </button>
      <Link href="/signup">Visit Signup Page</Link>
    </div>
  );
}
