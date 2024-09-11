import React, { useEffect, useState } from "react"
import pic from '../../image/pic.svg'

const Dashbord = () => {
    const contects = [
        {
            name: "Ajay",
            status: "Avaliable",
            img: pic
        },
        {
            name: "Ayush",
            status: "Avaliable",
            img: pic
        },
        {
            name: "Aman",
            status: "Avaliable",
            img: pic
        },
        {
            name: "Deepika",
            status: "Avaliable",
            img: pic
        },

    ]
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user:detail'))
        const fetchConversation = async () => {
            const res = await fetch(`http://localhost:3001/api/converstations/${loggedInUser?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            const resData = await res.json()
            console.log("fatch convertion data", resData)
            setConversation(resData)
        }
        fetchConversation()



    }, []);



    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
    console.log('user', user)

    const [conversations, setConversation] = useState([])

    console.log(" conversations>>>> ", conversations)


    // for message get
    const [messages, setMessage] = useState([])
    // console.log(messages , "chaat");



    // fethc message

    const fetchMessage = async (conversationId) => {
        console.log(conversationId, "id")
        const res = await fetch(`http://localhost:3001/api/message/${conversationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            }

        });
        const resData = await res.json()
        console.log("res DATA :- ", resData)
        setMessage(resData)
    }



    return (
        <div className="w-screen flex">
            {/* left side wala  */}
            <div className="w-[30%]   h-screen bg-secondary">
                <div className="flex  items-center my-8 ml-10">
                    <div className="border border-primary p-[2pxl] rounded-full"> <img src={user} width={75} height={75} /> </div>
                    <div className="ml-2">
                        <h3 className="text-2xl">{user?.fullName} </h3>
                        <p className="text-lg font-light">my account</p>

                    </div>

                </div>

                <hr />
                <div className="mx-6 mt-4">
                    <div className="text-primary text-lg"> Message</div>
                    <div>
                        {

                            conversations.length > 0 ?
                                conversations.map(({ conversationId, user }) => {
                                    // console.log("coversation ==>>>", conversation)
                                    return (

                                        <div className="flex  items-center py-8 border-b border-b-gray-300">
                                            <div className="curser-pointer flex items-center" onClick={() => fetchMessage(conversationId)} >

                                                <div className="border border-primary p-[2pxl] rounded-full">
                                                    <img src={'pic'} width={60} height={60} />
                                                </div>
                                                <div className="ml-2">
                                                    <h3 className="text-lg font-semibold"> {user?.fullName} </h3>
                                                    <p className="text-sm font-light text-gray-600">{user?.email}</p>

                                                </div>
                                            </div>

                                        </div>



                                    )
                                }) : <div className="text-center text-lg mt-20">no conversation</div>


                        }

                    </div>

                </div>

            </div>
            {/* chetes bitch wala */}
            <div className="w-[50%]  h-screen bg-white flex flex-col items-center">
                <div className="w-[75%] bg-secondary h-[80px] my-14  rounded-full flex items-center px-14 shadow">
                    <div className="cursor-pointer"><img src={user} width={60} height={60} /></div>
                    <div className="ml-6 mr-auto">
                        <h3 className="text-lg font-semibold "> Abhishek </h3>
                        <p className="text-sm font-light text-gray-600">online</p>
                    </div>
                    <div className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-phone"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 3a1 1 0 0 1 .877 .519l.051 .11l2 5a1 1 0 0 1 -.313 1.16l-.1 .068l-1.674 1.004l.063 .103a10 10 0 0 0 3.132 3.132l.102 .062l1.005 -1.672a1 1 0 0 1 1.113 -.453l.115 .039l5 2a1 1 0 0 1 .622 .807l.007 .121v4c0 1.657 -1.343 3 -3.06 2.998c-8.579 -.521 -15.418 -7.36 -15.94 -15.998a3 3 0 0 1 2.824 -2.995l.176 -.005h4z" /></svg>
                    </div>

                </div>

                <div className="h-[75%]  w-full overflow-scroll overflow-x-hidden border-b">

                    {/* messeging  */}
                    <div className="  py-14 m-4 shadow-sm">

                        {
                            messages.length > 0 ?
                                messages.map(({ message, user: { id } = {} }) => {
                                    if (id === user?.id) {
                                        return (
                                            <div className=" max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl p-4 ml-auto mb-6 text-white mb-6">
                                                hello howare you doing i am doing good but now i am filling selipy
                                            </div>
                                        )

                                    } else {
                                        <div className=" max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6">
                                            hello howare you doing i am doing good but now i am filling selipy
                                        </div>

                                    }


                                }) : <div className="text-center text-lg mt-24"> No message <div>
                        }
                        
                        
                          </div>

                                </div>






                                          {/* tying */}
                        <div className="w-full  p-14 flex items-center  ">
                            <input placeholder=" type a message..." className="p-2 px-4 border-0  rounded-full shadow-md bg-light focus:ring-0 focus:border-0 outline-none w-full" inputClassName=''></input>

                            <div className="ml-4 p-3 cursor-pointer bg-light rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-send"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                            </div>
                        </div>



                    </div>   
                    <div className="w-[25%]  h-screen bg-light"></div>
                </div>

                )
}

   
   
   










   {messages.length > 0 ? (
                            messages.map(({ message, user: { id } = {} }, index) => (
                                <div key={index} className={`max-w-[40%] p-4 mb-6 ${id === user?.id ? 'bg-primary rounded-b-xl rounded-tl-xl text-white ml-auto' : 'bg-secondary rounded-b-xl rounded-tr-xl'}`}>
                                    {message || 'Message content here'}
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-lg mt-24">No message</div>
                        )}







