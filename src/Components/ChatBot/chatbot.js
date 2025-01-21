// // Chatbot.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button } from '@material-ui/core';

// const Chatbot = () => {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);

//   const sendMessage = async () => {
//     const userMessage = { text: input, type: 'user' };
//     setMessages((prev) => [...prev, userMessage]);

//     const response = await axios.post('YOUR_DIALOGFLOW_WEBHOOK_URL', {
//       query: input,
//       // Include other necessary parameters based on your Dialogflow setup
//     });

//     const botMessage = { text: response.data.fulfillmentText, type: 'bot' };
//     setMessages((prev) => [...prev, botMessage]);
//     setInput('');
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index} className={msg.type}>
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <TextField
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         label="Type a message"
//       />
//       <Button onClick={sendMessage}>Send</Button>
//     </div>
//   );
// };

// export default Chatbot;
