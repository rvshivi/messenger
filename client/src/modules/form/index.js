// my chet code
import React, { useState } from "react"
import Input from "../../components/input"
import Button from "../../components/button"
import { useNavigate } from "react-router-dom"

const From = ({isSignInPage = true,}) => {

    const [data, setData] = useState({
        ...(!isSignInPage && {
            fullName: ''
        }),
        email: '',
        password: ''
    })



    const navigate = useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log(" data :>> ",data)

        const res=await fetch(`http://localhost:3001/api/${isSignInPage ? 'login':'register'}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify(data)


        })

        if(res.status === 400){
            alert('invalid credentials>>>>>>>.')
        } else{
        const resData=await res.json()  // resData me server se jo response aya jisme name and email ke sath token bhi hai usse local storage me set ker dete hai

        console.log("data ",resData)


        if(resData.token){
            localStorage.setItem('user:token', resData.token)
            localStorage.setItem('user:detail', JSON.stringify(resData.user) )
            navigate('/')
        }
    }

    }





return (

    <div className="bg-light h-screen flex items-center justify-center">
        <div className="bg-white w-[500px] h-[600px]  shadow-lg rounded-lg flex flex-col justify-center items-center">
            <div className="text-4xl font-extrabold">wellcome {isSignInPage && 'Back'}</div>
            <div className="text-xl font-light mb-10">{isSignInPage ? 'Sign in to get explored' : 'Sign up now to get started'} </div>

            <form className="flex flex-col items-center w-full" onSubmit={(e) => handleSubmit(e)}>

                {!isSignInPage && <Input label="Full name" name="name" placeholder="enter your full name" className="mb-6
                    w-[50%]"    value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} />}

                <Input label="Email address" type="email" name="email" placeholder="enter your email"
                    className="mb-6 w-[50%]" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

                <Input label="Password" type="password" name="password" placeholder="enter your password"
                    className="mb-10 w-[50%]" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />

                <Button label={isSignInPage ? 'Sign in' : 'Sign up'} type="submit" className="mb-3" />

            </form>
            <div>{isSignInPage ? 'Did not have un account? ' : 'Already have an account?'}  <span className="text-primary cursor-pointer underline"
                onClick={() => navigate(`/users/${isSignInPage ? "sign_up" : 'sign_in'}`)}>{isSignInPage ? 'Sign up' : 'Sign in'} </span></div>


        </div>

    </div>
)
}


export default From
