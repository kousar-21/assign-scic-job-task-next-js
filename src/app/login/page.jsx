'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import SocialLoginPage from '../components/SocialLogin/page';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';

export default function loginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [authError, setAuthError] = useState("");
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  const onSubmit = async data => {
    setAuthError("");

    // Call NextAuth signIn with credentials
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    });

    if (res.error) {
      setAuthError(res.error);
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
      router.push(from); // redirect to original page or home
    }
  }

  return (
    <div className="flex items-center justify-center bg-sky-100 dark:bg-gray-600 dark:text-white py-10">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className='text-3xl font-extrabold text-sky-500'>Welcome to website</h1>
          <h1 className="text-2xl font-bold">Please Login!</h1>

          {/* Show auth error */}
          {authError && <p className="text-red-500 text-sm mb-2">{authError}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">

              {/* Email field */}
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email"
                {...register('email', { required: true })} />
              {errors.email?.type === 'required' && <p className='text-red-500 text-sm'>Email is Required</p>}

              {/* Password field */}
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password"
                {...register('password', {
                  required: true,
                  minLength: 6,
                  validate: {
                    hasCapital: (v) => /[A-Z]/.test(v) || "Must include a Capital letter",
                    hasSmall: (v) => /[a-z]/.test(v) || "Must include a Small letter",
                    // hasSpecial: (v) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(v) || "Must include a special character",
                  },
                })} />
              {errors.password?.type === 'required' && <p className='text-red-500 text-sm'>Password is Required</p>}
              {errors.password?.type === 'minLength' && <p className='text-red-500 text-sm'>Password must be 6 characters or longer</p>}
              {errors.password?.message && <p className='text-red-500 text-sm'>{errors.password.message}</p>}

              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </form>

          <div>New in Website? <Link href='/register'><span className='text-blue-400 underline'>Register</span></Link> please</div>
          <SocialLoginPage></SocialLoginPage>
        </div>
      </div>
    </div>
  )
}
