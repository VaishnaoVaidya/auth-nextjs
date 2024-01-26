"use client";
import axios from "axios";
import { log } from "console";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { ToastBar } from "react-hot-toast";

export default function forgotPassword() {
  const route = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetPass, setResetPass] = useState(false);

  const onResetPassword = async () => {
    try {
      await axios.post("/api/users/resetpassword", { newPassword, token });
      setResetPass(true);
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, [token]);

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
       {error ? (
            <h3 className="text-center m-2 text-red-500">{error}</h3>
          ) : null}
      {resetPass ? (
        <div>
          <p className="text-xl text-center">Password reset successfully!!</p>
          <button
            onClick={() => {
              route.push("/login");
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
            Go to login
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-white text-2xl">Change password</h1>
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
                paddingLeft: "9px",
              }}
              htmlFor="password"
            >
              New Password
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:bg-gray-600 text-black"
              id="email"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
            />
            <h6
              style={{
                alignSelf: "flex-start",
                paddingLeft: "9px",
                fontSize: "10px",
                color: "red",
                marginTop: "2px",
              }}
            >
              {error}
            </h6>
            <label
              style={{
                alignSelf: "flex-start",
                marginTop: "13px",
                paddingLeft: "9px",
              }}
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:bg-gray-600 text-black"
              id="email"
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>

          <div>
            <button
              onClick={onResetPassword}
              style={{
                width: "auto",
                height: "40px",
                borderWidth: "1px",
                borderColor: "white",
                color: "white",
                borderRadius: "5px",
                margin: "10px",
                padding: "5px",
              }}
            >
              Reset Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
