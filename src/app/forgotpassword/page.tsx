"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function forgotPassword() {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = React.useState({
  //   username: "",
  //   email: "",
  // });


  const onForgotPassword = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email });
      setSentEmail(true);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {
        sentEmail ? (
          <div>
          <p className="text-xl text-center">
            Reset Password Email sent successfully!!
          </p>
          </div>
        ): (
          <div>
           <p className="text-center p-2">{loading ? "Processing..." : ""}</p>

            {error ? (
            <h3 className="text-center m-2 text-red-500">{error}</h3>
          ) : null}
          <h1 className="text-center text-white text-2xl">Password Recovery</h1>
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label
              style={{
                alignSelf: "flex-start",
                marginTop: "23px",
                paddingLeft: "30px",
              }}
              htmlFor="password"
            >
              Email Address
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:bg-gray-600 text-black"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </div>
  
        <div>
          <button
            onClick={() => {
              route.back();
            }}
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
            Cancel
          </button>
          <button
            onClick={onForgotPassword}          
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
            Next
          </button>
        </div>
        </div>
        )
      }
      
    </div>
  );
}
