import { useEffect, useRef, useState } from 'react';
import './newPrompt.css';
import Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from "react-markdown";

const NewPrompt = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const[img, setImg] = useState({
        isLoading:false,
        error:"",
        dbData:{},
        aiData:{}
    })

    const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
        ],
        generationConfig: {

        },
      });

    const endRef = useRef(null);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [img.dbData, question, answer]);

    const add = async (text) => {
        setQuestion(text);
        // if no img data, only pass text
        const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData,text] : [text]);
        
        let accuText = ""
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            accuText += chunkText;
            setAnswer(accuText);
        }
        
        setImg({isLoading:false,
            error:"",
            dbData:{},
            aiData:{}});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault() //bc we don't want to refresh the page

        const text = e.target.text.value;
        if(!text) return;

        add(text);
    };

    return (
        <>
            {/* add new chat here */}
            {img.isLoading && <div className=''>Loading...</div>}
            {img.dbData?.filePath && (
                <IKImage
                urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                path={img.dbData?.filePath}
                width="380"
                transformation={[{ width: 380 }]}
                />
            )}
            {/* if there is an question/answer set here a div */}
            {question && <div className='message user'>{question}</div>}
            {answer && <div className='message'><Markdown>{answer}</Markdown></div>}
            {/* mark the end of this chat and endRef will be trigger to automatically scroll down the chat one the component mounts */}
            <div className="endChat" ref={endRef}></div>
            <form className="newForm" onSubmit={handleSubmit}>
                <Upload setImg={setImg}/>
                {/* use id from htmlFor, so the input is hidden*/}
                <input id="file" type="file" multiple={false} hidden/>
                <input type="text" name="text" placeholder='Ask anything...'/>
                <button>
                    <img src="/arrow.png" alt="" />
                </button>
            </form>
        </>
    )
}

export default NewPrompt