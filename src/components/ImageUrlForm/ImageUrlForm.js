import React from 'react';

const ImageUrlForm = ( {onInputChange, input, detectClick}) => {

    return (
        <div className="form shadow-5 pa4" options={{ max : 25 }} style={{zIndex: "1", width:"50vw", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <p className="f3 ma4 white">{'Upload a image to see if I can find a face!'}</p>
            <input className="ma4 black bb pa2" style={{width:"500px", fontSize:"1em"}} onChange={onInputChange} type='text' value={input}/>
            <button className="f5 no-underline bg-animate hover-bg-black hover-white pa3 ba border-box mr4 w4 pointer" onClick={detectClick}>Detect</button>
        </div>
    )

}

export default ImageUrlForm;
