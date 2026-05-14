import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

const [file,setFile]=useState(null);

const [question,setQuestion]=
useState("");

const [messages,setMessages]=
useState([]);

const [loading,setLoading]=
useState(false);


// Upload PDF

const uploadPDF=async()=>{

try{

if(!file){

alert(
"Please select PDF"
);

return;

}

const formData=
new FormData();

formData.append(
"pdf",
file
);

setLoading(true);

const response=
await axios.post(
"http://localhost:5000/upload",
formData
);

// clear old chat
setMessages([]);

// clear input
setQuestion("");

alert(
response.data.message
);

}catch(error){

console.log(error);

alert(
"Upload Failed"
);

}
finally{

setLoading(false);

}

};


// Ask Question

const askQuestion=
async()=>{

try{

if(
!question.trim()
){

alert(
"Enter question"
);

return;

}

setLoading(true);

const response=
await axios.post(
"http://localhost:5000/ask",
{
question
}
);

setMessages(
(prev)=>[
...prev,
{
question:
question,
answer:
response.data.answer
}
]
);

setQuestion("");

}catch(error){

console.log(error);

alert(
"Question Failed"
);

}
finally{

setLoading(false);

}

};


return(

<div className="container">

<h1>
AI PDF Chat
</h1>

<input
type="file"
accept=".pdf"
onChange={(e)=>
setFile(
e.target.files[0]
)
}
/>

<button
onClick={uploadPDF}
disabled={loading}
>

{
loading
?
"Uploading..."
:
"Upload PDF"
}

</button>


{file && (

<p
style={{

textAlign:
"center",

marginTop:
"10px",

color:
"#555",

fontSize:
"14px"

}}
>

📄 {file.name}

</p>

)}


<div
className=
"chat-box"
>

{

messages.map(

(
msg,
index
)=>(

<div
key={index}
>

<div
className=
"user-message"
>

{msg.question}

</div>

<div
className=
"ai-message"
>

{msg.answer}

</div>

</div>

)

)

}

{

loading &&

<p
className=
"thinking"
>

AI is thinking...

</p>

}

</div>


<input

type="text"

placeholder=
"Ask your question..."

value=
{question}

onChange={(e)=>

setQuestion(
e.target.value
)

}

onKeyDown={(e)=>{

if(
e.key==="Enter"
){

askQuestion();

}

}}

/>


<button

onClick=
{askQuestion}

disabled=
{loading}

>

Ask

</button>


</div>

);

}

export default App;