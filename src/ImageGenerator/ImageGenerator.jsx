import React, { useState, useRef } from 'react';
import './ImageGenerator.css';
import default_image from '../Components/Assets/default_image.svg';

const ImageGenerator = () => {
    const [image_url, setimage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading,setloading] = useState(false);


    const generateImage = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        setloading(true);
        
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Use environment variable
                    "user-agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: inputRef.current.value,
                    n: 1,
                    size: "512x512",
                }),
            }
        );

            let data = await response.json();
           let data_array=data.data;
           setimage_url(data_array[0].url);
           setloading(false);
    
    
    }

    return (
        <div className='ai-image-generator'>
            <div className="header">Ai-Image-<span>Generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={image_url === "/" ? default_image : image_url} alt="Generated" />
                </div>
                <div className="loading">
                    <div className={loading?"loading-bar-full":"loading-bar"}>
                        <div className={loading?"loading-text":"display-none"}>Loading....</div>
                    </div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see..?' />
                <div className="Generate-btn" onClick={generateImage}>Generate</div>
            </div>
        </div>
    );
};

export default ImageGenerator;
