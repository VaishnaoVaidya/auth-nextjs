"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);

      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <hr />
      <h2  style={{
          width: "auto",
          height: "30px",
          backgroundColor: "#3dd081",
          padding: '3px',
          borderRadius: "5px",
          color: "#fff",
          marginTop: "10px",
        }}>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>

      <button
        onClick={logout}
        style={{
          width: "100px",
          height: "40px",
          padding: "4px",
          backgroundColor: "#3473c8",
          borderRadius: "5px",
          color: "#fff",
          marginTop: "10px",
        }}
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        style={{
          width: "140px",
          height: "40px",
          padding: "4px",
          backgroundColor: "#c370e9",
          borderRadius: "5px",
          color: "#fff",
          marginTop: "10px",
        }}
      >
        GetUser Details
      </button>
    </div>
  );
}
