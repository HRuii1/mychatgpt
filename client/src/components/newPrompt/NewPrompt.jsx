import { useEffect, useRef, useState } from 'react';
import './newPrompt.css'
import Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';

const NewPrompt = () => {

    const[img, setImg] = useState({
        isLoading:false,
        error:"",
        dbData:{}
    })

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
      }, [img.dbData]);

    return (
        <div className='newPrompt'>
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
            {/* mark the end of this chat and endRef will be trigger to automatically scroll down the chat one the component mounts */}
            <div className="endChat" ref={endRef}></div>
            <form className="newForm">
                <Upload setImg={setImg}/>
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