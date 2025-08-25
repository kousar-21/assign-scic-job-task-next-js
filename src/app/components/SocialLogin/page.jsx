'use client'
import React from 'react'
import { signIn } from 'next-auth/react'; 
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2'; 

export default function SocialLoginPage() {
  const router = useRouter(); 
  const searchParams = useSearchParams(); 
  const from = searchParams.get('from') || '/'; // redirect back to page or home

  const handleGoogleSignIn = async () => { //implement NextAuth Google
    try {
      const res = await signIn("google", { redirect: false });

      if (res?.error) {
        Swal.fire({ 
          icon: 'error',
          title: 'Login Failed',
          text: res.error
        });
      } else {
        Swal.fire({ 
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500
        });
        router.push(from); //redirect to original page or home
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: err.message
      });
    }
  }

  return (
    <div>
      <div className="divider">OR</div>
      {/* Google */}
      <button onClick={handleGoogleSignIn} className="btn bg-white hover:bg-sky-400 w-full text-black border-[#e5e5e5]">
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
        Login with Google
      </button>
    </div>
  )
}
