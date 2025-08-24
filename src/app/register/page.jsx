'use client'
import Link from 'next/link';
import React from 'react'
import SocialLoginPage from '../components/SocialLogin/page';
import { useForm } from 'react-hook-form';

export default function registerPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const { createUser, updateUserProfile } = useAuth();
  // const axiosInstance = useAxios();
  // const [picture, setPicture] = useState('');
  // const location = useLocation();
  // const navigate = useNavigate();
  // const from = location.state ? location.state : '/';



  const onSubmit = data => {
    console.log(data)

    // createUser(data.email, data.password)
    //   .then(async (result) => {
    //     console.log("all result data", result.user)

    //     const userInfo = {
    //       email: data.email,
    //       name: data.name,
    //       image: picture,
    //       role: "user",
    //       created_at: new Date().toISOString(),
    //       last_log_in: new Date().toISOString()
    //     }

    //     console.log("modified user", userInfo)

    //     const userPost = await axiosInstance.post('/users', userInfo)
    //     console.log(userPost.data)

    //     if (userPost.data.insertedId) {
    //       //updateProfile
    //       const userProfile = {
    //         displayName: data.name,
    //         photoURL: picture
    //       }

    //       updateUserProfile(userProfile)
    //         .then(() => {
    //           console.log('user Profile Picture Updated')
    //           Swal.fire({
    //             position: "top",
    //             icon: "success",
    //             title: "Your Registration completed successfully",
    //             showConfirmButton: false,
    //             timer: 1500
    //           });
    //           setTimeout(() => {
    //             navigate(from)
    //           }, 1500)
    //         })
    //         .catch(error => {
    //           // console.log(error.message)
    //           toast.error(error.message)
    //         })
    //     }
    //   })
    //   .catch(error => {
    //     // console.log(error.message)
    //     toast.error(error.message)
    //   })
  }

  const handleImageUpload = async (e) => {
    const photo = e.target.files[0];
    console.log(photo);

    // const formData = new FormData();
    // formData.append('image', photo)

    // const photoUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_Key}`
    // const res = await axios.post(photoUploadUrl, formData)

    // setPicture(res.data.data.url)
  }

  return (
    <div className="flex items-center justify-center bg-sky-100 dark:bg-gray-600 dark:text-white py-10">

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className='text-3xl font-extrabold text-sky-500'>Welcome to website</h1>
          <h1 className="text-2xl font-bold">Please Register!</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* name field */}
              <label className="label">Name</label>
              <input type="text" className="input" placeholder="Your Name"
                {...register("name", { required: true })}
              />{errors.name?.type === 'required' && <p className='text-red-500 text-sm'>Name is Required</p>}

              {/* image field */}
              <label className="label">Image</label>
              <input type="file" onChange={handleImageUpload} className="input" />

              {/* Email field */}
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email"
                {...register('email', { required: true })} />
              {
                errors.email?.type === 'required' && <p className='text-red-500 text-sm'>Email is Required</p>
              }

              {/* password field */}
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password"
                {...register('password', {
                  required: true,
                  minLength: 6,
                  validate: {
                    hasCapital: (v) => /[A-Z]/.test(v) || "Must include a Capital letter",
                    // hasSmall: (v) => /[a-z]/.test(v) || "Must include a Small letter",
                    hasSpecial: (v) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(v) || "Must include a special character", // eslint-disable-line no-useless-escape
                  },
                })} />
              {
                errors.password?.type === 'required' && <p className='text-red-500 text-sm'>Password is Required</p>
              }
              {
                errors.password?.type === 'minLength' && <p className='text-red-500 text-sm'>Password must be 6 characters or longer</p>
              }
              {
                errors.password?.message && <p className='text-red-500 text-sm'>{errors.password.message}</p>
              }

              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
          <div>Already have an account?  please <Link href='/login'><span className='text-blue-400 underline'>Login</span></Link></div>
          <div><SocialLoginPage></SocialLoginPage></div>
        </div>
      </div>

    </div>
  )
}
