
// import React, { useEffect, useState } from "react";
// import pic from '../../image/pic.svg';

// import { io, Socket } from 'socket.io-client'




// const Dashbord = () => {






//     const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
//     console.log('user >>>>>>', user)
//     const [conversations, setConversation] = useState([]);
//     console.log(" conversations>>>> ", conversations)


//     const [messages, setMessages] = useState({ messages: [], receiver: {} });

//     const [message, setMessage] = useState('')
//     console.log("messages[][][][]", messages)

//     const [users, setUsers] = useState([])
//     console.log("users: ==================== ", users)

//     const [socket, setSocket] = useState(null)
//     console.log("socket", socket)


//     useEffect(() => {
//         setSocket(io('http://localhost:8080'))

//     }, [])

//     useEffect(() => {
//         socket?.emit('addUser', user?.id);
//         socket?.on('getUsers', users => {
//             console.log("activeUsers:>>", users)

//         })
//         // get message
//         socket?.on('getMessage', data => {
//             console.log("data<<<<")
//             // setMessages({messages:[...messages?.messages,data],receiver:messages.receiver,conversationId:messages?.conversationId})

//             setMessages(prev => ({
//                 ...prev,
//                 messages: [...prev.messages, { user: data.user, message: data.message }]
//             }))
//         })


//     }, [socket])








//     // receiver information 
//     useEffect(() => {
//         const loggedInUser = JSON.parse(localStorage.getItem('user:detail'))
//         const fetchConversation = async () => {
//             const res = await fetch(`http://localhost:3001/api/converstations/${loggedInUser?.id}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',

//                 },
//             });
//             const resData = await res.json()
//             console.log("fatch convertion data", resData)
//             setConversation(resData)
//         }
//         fetchConversation()



//     }, []);

//     useEffect(() => {

//         const fatchUsers = async () => {
//             const res = await fetch(`http://localhost:3001/api/users/${user?.id}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',

//                 }
//             });


//             const resData = await res.json()
//             setUsers(resData)
//         }
//         fatchUsers()

//     }, [])


//     const fetchMessages = async (conversationId, user) => {
//         console.log(conversationId, "id", "reciever ", user);
//         const res = await fetch(`http://localhost:3001/api/message/${conversationId}`, {
//             method: 'GET',
           
//             headers: { 'Content-Type': 'application/json' },
//         });
//         const resData = await res.json();
//         console.log("fetched message data:>>", resData);
//         setMessages({ messages: resData, receiver: user, conversationId });
//         console.log(messages, "chat", messages.receiver, "reciever", conversationId, "batchhit id")
//         console.log('State after setting messages:', { messages: resData, receiver: user, conversationId });

//     };

//     const sendMessage = async (e) => {
//         console.log("message detasl: ", messages?.conversationId, " User ", user?.id, " recever :=", messages?.receiver?.receiverId)

//         socket?.emit('sendMessage', {
//             conversationId: messages?.conversationId,
//             senderId: user?.id,
//             message,
//             receiverId: messages?.receiver?.receiverId


//         })

//         console.log("sending message with conversation id", messages?.conversationId)
//         const res = await fetch(`http://localhost:3001/api/message`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 conversationId: messages?.conversationId,


//                 senderId: user?.id,
//                 message,
//                 receiverId: messages?.receiver?.receiverId


//             })


//         });

       
//         setMessage('')




//     }




//     return (
//         <div className="w-screen flex">
//             {/* Left side */}
//             <div className="w-[30%] h-screen bg-secondary">
//                 <div className="flex items-center my-8 ml-10">
//                     <div className="border border-primary p-[2px] rounded-full">
//                         <img src={user?.profilePicture || pic} width={75} height={75} alt="User" />
//                     </div>
//                     <div className="ml-2">
//                         <h3 className="text-2xl">{user?.fullName}</h3>
//                         {console.log(user?.fullName, " fullname")}
//                         <p className="text-lg font-light">my account</p>
//                     </div>
//                 </div>
//                 <hr />
//                 <div className="mx-6 mt-4">
//                     <div className="text-primary text-lg">Message</div>
//                     <div>
//                         {
//                             conversations.length > 0 ?
//                                 conversations.map(({ conversationId, user }) => {

//                                     // console.log("conversation >>.>." ,conversation )
//                                     return (


//                                         <div className="flex items-center py-8 border-b border-b-gray-300">
//                                             <div className="cursor-pointer flex items-center" onClick={() => fetchMessages(conversationId, user)} >
//                                                 <div className="border border-primary p-[2px] rounded-full">
//                                                     <img src={pic} width={60} height={60} />
//                                                 </div>
//                                                 <div className="ml-2">
//                                                     <h3 className="text-lg font-semibold">{user?.fullName}</h3>

//                                                     <p className="text-sm font-light text-gray-600">{user?.email}</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )

//                                 }) : <div className="text-center text-lg mt-20">No conversation</div>
//                         }
//                     </div>
//                 </div>
//             </div>

//             {/* Chat section */}
//             <div className="w-[50%] h-screen bg-white flex flex-col items-center">

//                 {

//                     messages?.receiver?.fullName &&
//                     <div className="w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 shadow">
//                         <div className="cursor-pointer">
//                             <img src={user?.profilePicture || pic} width={60} height={60} alt="User" />
//                         </div>
//                         <div className="ml-6 mr-auto">
//                             <h3 className="text-lg font-semibold">{messages?.receiver?.fullName}</h3>
//                             <p className="text-sm font-light text-gray-600">{messages?.receiver?.email}</p>
//                         </div>
//                         <div className="cursor-pointer">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icon-tabler-phone">
//                                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                                 <path d="M9 3a1 1 0 0 1 .877 .519l.051 .11l2 5a1 1 0 0 1 -.313 1.16l-.1 .068l-1.674 1.004l.063 .103a10 10 0 0 0 3.132 3.132l.102 .062l1.005 -1.672a1 1 0 0 1 1.113 -.453l.115 .039l5 2a1 1 0 0 1 .622 .807l.007 .121v4c0 1.657 -1.343 3 -3.06 2.998c-8.579 -.521 -15.418 -7.36 -15.94 -15.998a3 3 0 0 1 2.824 -2.995l.176 -.005h4z" />
//                             </svg>
//                         </div>
//                     </div>



//                 }

//                 <div className="h-[75%] w-full overflow-scroll overflow-x-hidden ">
//                     <div className="py-20   m-4  shadow-sm">


//                         {
//                             messages?.messages?.length > 0 ?
//                                 messages.messages.map(({ message, user: { id } = {} }) => {
//                                     if (id === user?.id) {
//                                         console.log(user?.id, "use")
//                                         return (
//                                             <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 mb-6">
//                                                 {message}
//                                             </div>
//                                         );
//                                     } else {
//                                         return (
//                                             <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6">
//                                                 {message}
//                                             </div>
//                                         );
//                                     }
//                                 }) :
//                                 <div className="text-center text-lg mt-20">No messages or No Conversation selected</div>
//                         }
//                     </div>
//                 </div>


//                 {
//                     messages?.receiver?.fullName &&

//                     <div className="w-full p-14 pt-0 flex items-center">
//                         <input placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} className="p-2 px-4 border-0 rounded-full shadow-md bg-light focus:ring-0 focus:border-0 outline-none w-full" />
//                         <div className={`ml-4 p-3 cursor-pointer bg-light rounded-full ${!message ? 'pointer-events-none' : ''}`} onClick={() => sendMessage()} >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-send">
//                                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                                 <path d="M10 14l11 -11" />
//                                 <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
//                             </svg>
//                         </div>
//                     </div>

//                 }




//             </div>

//             <div className="w-[25%] h-screen bg-light pt-5 pl-5 " >
//                 <div className="text-primary text-lg">People</div>
//                 <div>
//                     {
//                         users.length > 0 ?
//                             users.map(({ userId, user }) => {
//                                 // console.log("conversation >>.>." ,conversation )
//                                 return (


//                                     <div className="flex items-center py-8 border-b border-b-gray-300">
//                                         <div className="cursor-pointer flex items-center" onClick={() => fetchMessages('new', user)} >
//                                             <div className="border border-primary p-[2px] rounded-full">
//                                                 <img src={pic} width={60} height={60} />
//                                             </div>
//                                             <div className="ml-2">
//                                                 <h3 className="text-lg font-semibold">{user?.fullName}</h3>

//                                                 <p className="text-sm font-light text-gray-600">{user?.email}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )

//                             }) : <div className="text-center text-lg mt-20">No conversation</div>
//                     }
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default Dashbord;