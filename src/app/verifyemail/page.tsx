"use client"
import axios from "axios"
import Link from "next/link"
import React, {useEffect, useState} from "react"


export default function verifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async ()=> {
        try {
            await axios.post('/api/users/verifyemail',{token})
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data);
    
        }
    }

    useEffect(()=> {
         const urlToken = window.location.search.split("=")[1];
         setToken(urlToken || "");
    }, [])

    useEffect(() => {
      if (token.length > 0) {
       verifyUserEmail();
      }
    }, [token])
    return (
        <div style={{height: "100vh", display: "flex", flexDirection: "column",textAlign: "center", justifyContent: "center", alignItems: "center"}}>
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-1 bg-orange-500 text-black" style={{width: "auto", height: "auto"}}>{token ? `${token}` : "No token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href='/login'>
                    Login
                    </Link>
                    </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                    </div>
            )}
        </div>
    )
    
}