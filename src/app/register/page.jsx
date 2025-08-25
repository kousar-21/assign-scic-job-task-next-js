'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import SocialLoginPage from '../components/SocialLogin/page';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import useImageUpload from '../Hooks/ImageUploadHook/useImageUpload';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function registerPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { picture, handleImageUpload, error: imageError } = useImageUpload();
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    setIsUploading(true);
    await handleImageUpload(e);
    setIsUploading(false);
  }

  console.log("picture", picture)

  const onSubmit = async (data) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        image: picture || null,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString()
      };

      const res = await axios.post('/api/users', userData);
      console.log("User saved:", res.data);

      if (res.data.insertedId) {
        // SweetAlert for success
        await Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully registered.',
          showConfirmButton: false,
          timer: 1500
        });
        router.push('/');
      } else {
        // SweetAlert for error if insert failed
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Please try again.'
        });
      }
    }
    catch (err) {
      console.error(err);
      Swal.fire({ // SweetAlert for network/server error
        icon: 'error',
        title: 'Registration Failed',
        text: err.message || 'Something went wrong.'
      });
    }
  }



  return (
    <div className="flex items-center justify-center bg-sky-100 dark:bg-gray-600 dark:text-white py-10">

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className='text-3xl font-extrabold text-sky-500'>Welcome to website</h1>
          <h1 className="text-2xl font-bold">Please Register!</h1>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* name field */}
              <label className="label">Name</label>
              <input type="text" className="input" placeholder="Your Name"
                {...register("name", { required: true })}
              />
              {errors.name?.type === 'required' && <p className='text-red-500 text-sm'>Name is Required</p>}

              {/* image field */}
              <label className="label">Image</label>
              <input type="file" onChange={handleUpload} className="input" />

              {/* Email field */}
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email"
                {...register('email', { required: true })} />
              {errors.email?.type === 'required' && <p className='text-red-500 text-sm'>Email is Required</p>}

              {/* password field */}
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

              <button className="btn btn-neutral mt-4" type="submit" disabled={isUploading}>
                {isUploading ? "Uploading Image..." : "Register"}
              </button>
            </fieldset>
          </form>
          <div>Already have an account? please <Link href='/login'><span className='text-blue-400 underline'>Login</span></Link></div>
          <div><SocialLoginPage></SocialLoginPage></div>
        </div>
      </div>

    </div>
  )
}
