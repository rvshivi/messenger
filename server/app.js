import express from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cors from 'cors'
// import dotenv from 'dotenv'

// import filles
import { Users } from './models/user.js'
import Conversations from './models/conversation.js'
import Messages from './models/messages.js'

import connectdb from './db/db.config.js';

import { Server } from "socket.io";

const io = new Server(8080, {
    cors: {
        origin: 'http://localhost:3000',
    }
});




const DATABASE_URL = process.env.PORT || ("mongodb://localhost:27017/messenjer")

const app = express();


const port = process.env.PORT || 3001



// app use
app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(cors())


// //socket.io
let users = [];
io.on('connection', socket => {
    //receiving
    console.log("user connected", socket.id)
    socket.on('addUser', userId => {
        const isUserExist = users.find(user => user.userId === userId)

        if (!isUserExist) {

            const user = { userId, socketId: socket.id };
            users.push(user);
            io.emit('getUsers', users)
        }



    });

    socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
        const receiver = users.find(user => user.userId === receiverId);
        const sender = users.find(user => user.userId === senderId);
        const user = await Users.findById(senderId);
        console.log("sender<<<<<<", sender,receiver )

        



        if (receiver) {
            io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
                senderId,
                message,
                conversationId,
                receiverId,
                user: { id: user._id, fullName: user.fullName, email: user.email }
            });
        } else {
            io.to(sender.socketId).emit('getMessage', {
                senderId,
                message,
                conversationId,
                receiverId,
                user: { id: user._id, fullName: user.fullName, email: user.email }
            });



        }

    });


    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id)
        io.emit('getUsers', users);
    })


})




// routes
app.get('/', (req, res) => {
    console.log(" server is lesning")

})

app.post('/api/register', async (req, res, next) => {

    try {

        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            res.status(400).send('Please fil the all requred filldes')

        } else {

            // user exist or not in database

            const isAllreadyExist = await Users.findOne({ email });

            if (isAllreadyExist) {
                res.status(400).send('"user alrleadyl exists"')


            } else {
                const newUser = await Users.create({
                    fullName,
                    email


                });
                bcryptjs.hash(password, 10, (err, hashedPassword) => {
                    newUser.set('password', hashedPassword)
                    newUser.save();
                    // next();

                })
                console.log(newUser)
                return res.status(200).json({ message: "user registered successfully" })
            


            }


        }

    } catch (error) {
        console.log(error)

    }

})



// login apis

// shiva: shiva123,




app.post('/api/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Please fil the all requred filldes')

        }




        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).send('"user email or password is incorect"')


        }

        const validateUser = await bcryptjs.compare(password, user.password);
        if (!validateUser) {
            return res.status(400).send('user email or password is incorect')
        }


        const payload = {
            userId: user._id,
            email: user.email
        }





        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || " this _IS_A_JWT_SEkRET_KEY "
        //   token generate syncronoues 
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 84600 })

        // save token in the user object
        user.token = token;






        await user.save();
        return res.status(200).json({ user: { id: user._id, email: user.email, fullName: user.fullName, }, token: user.token })
        console.log("chek user", user)


    } catch (error) {
        console.log(error)
    }

})




// converstaion apis 
// post

app.post('/api/converstation', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const newConversation = await Conversations.create({ members: [senderId, receiverId] });
        // newConversation.save();
        res.status(200).send('conversation created succesfully');




    } catch (error) {
        console.log(error)
    }
})

// get user
// is user ki kin kin ke sath conversation chali rahi hai

app.get('/api/converstations/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversations.find({ members: { $in: [userId] } });   // yeh user id converstation me jin members ke sath awailibal ho wo member 
        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== userId);

            const user = await Users.findById(receiverId);

            return { user: { receiverId: user._id, email: user.email, fullName: user.fullName }, conversationId: conversation._id }
        }))

        console.log("converstation :", await conversationUserData)
        res.status(200).json(await conversationUserData);



    } catch (error) {
        console.log(error)
    }
})


//    messages : one to one

app.post('/api/message', async (req, res) => {

    try {


        const { conversationId, senderId, message, receiverId = '' } = req.body;
        console.log(conversationId, "conver", senderId, "sender", message, "message", receiverId, "recsiver")
        if (!senderId || !message) return res.status(400).send("plesase fill all required fiels  ")

        if (conversationId === 'new' && receiverId) {
            console.log(" conversastion id  per created new conversation  ")
            const newConversation = await Conversations.create({ members: [senderId, receiverId] });
            //    await newConversation.save()

            const newMessage = await Messages.create({ conversationId: newConversation._id, senderId, message });
            // await newMessage.save();
            return res.status(200).send("Message sent succussfully")

        } else if (!conversationId && !receiverId) {
            console.log(" converation id nahi hai or recever id bhi ni hai")

            return res.status(400).send("plesase fill all required fiels ")

        }

        console.log(conversationId);
        const newMessage = await Messages.create({ conversationId, senderId, message });
        res.status(200).send("Message sent succesfully")



    } catch (error) {
        console.log(error)
    }



})




app.get('/api/message/:conversationId', async (req, res) => {
    try {
        const conversationId = req.params.conversationId;

        if (conversationId === 'new') {

            return res.status(200).json([]);
        }

        console.log("Received conversationId:", conversationId);
        const messages = await Messages.find({ conversationId });
        console.log("Messages found:", messages);

        // Use Promise.all to handle all asynchronous calls
        const messageUserData = await Promise.all(messages.map(async (message) => {
            const user = await Users.findById(message.senderId);

            // Log if user is not found
            if (!user) {
                console.error("User not found for senderId:", message.senderId);
                return null;
            }

            return {
                user: {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName
                },
                message: message.message
            };
        }));

        // Filter out null values if user data was not found
        const validMessageUserData = messageUserData.filter(data => data !== null);

        res.status(200).json(validMessageUserData);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/users/:userId', async (req, res) => {
    console.log("api users ")


    try {
        const userId = req.params.userId;
        const users = await Users.find({ _id: { $ne: userId } });


        const userData = Promise.all(users.map(async (user) => {
            return { user: { email: user.email, fullName: user.fullName, receiverId: user._id } }

        }))
        res.status(200).json(await userData);

    } catch (error) {
        console.log(error)
    }

})


//  connection for database

connectdb(DATABASE_URL);

app.listen(port, () => {
    console.log(`this port is lesning ${port}`)
})