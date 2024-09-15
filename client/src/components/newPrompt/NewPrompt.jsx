import { useEffect, useRef } from 'react';
import './newPrompt.css'

const NewPrompt = () => {

    const endRef = useRef(null);

    useEffect(()=>{
        endRef.current.scrollIntoView({behavior: "smooth"});
    }, [])

    return (
        <div className='newPrompt'>
            {/* add new chat here */}
            {/* mark the end of this chat and endRef will be trigger to automatically scroll down the chat one the component mounts */}
            <div className="endChat" ref={endRef}></div>
            <form className="newForm">
                <label htmlFor="file">
                    <img src="/attachment.png" alt="" />
                </label>
                {/* use id from htmlFor, so the input is hidden*/}
                <input id="file" type="file" multiple={false} hidden/>
                <input type="text" placeholder='Ask anything...'/>
                <button>
                    <img src="/arrow.png" alt="" />
                </button>
            </form>
        </div>
    )
}

export default NewPrompt