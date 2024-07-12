import React, { useEffect, useRef, useState } from "react";
import Picker, { EmojiStyle } from "emoji-picker-react";
import { useMediaQuery } from "react-responsive";
import { Photo } from "../../svg";

export default function EmojiPickerBackgrounds({
  text,
  user,
  setText,
  type2,
  background,
  setBackground,
  setShowPrev,
  setError,
}) {
  const [picker, setPicker] = useState(false);
  const [showBgs, setShowBgs] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

  const handleEmoji = (event, emojiObject) => {
    const emoji = emojiObject.emoji;
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const postBackgrounds = [
    "../../../images/postbackgrounds/1.jpg",
    "../../../images/postbackgrounds/2.jpg",
    "../../../images/postbackgrounds/3.jpg",
    "../../../images/postbackgrounds/4.jpg",
    "../../../images/postbackgrounds/5.jpg",
    "../../../images/postbackgrounds/6.jpg",
    "../../../images/postbackgrounds/7.jpg",
    "../../../images/postbackgrounds/8.jpg",
    "../../../images/postbackgrounds/9.jpg",
  ];

  const backgroundHandler = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add("bgHandler");
  };

  const removeBackground = () => {
    bgRef.current.style.backgroundImage = "";
    setBackground("");
    bgRef.current.classList.remove("bgHandler");
  };

  const sm = useMediaQuery({
    query: "(max-width:550px)",
  });

  const paddingTop = background ? Math.abs(text.length * 0.1 - 32) : 0;

  return (
    <div className={type2 ? "images_input " : ""}>
      <div className={!type2 ? "flex_center pt-2" : ""} ref={bgRef}>
        <textarea
          ref={textRef}
          maxLength='250'
          value={text}
          placeholder={`What's on your mind, ${user.first_name}`}
          className={`post_input text-gray-300  ${type2 ? "input2 " : ""} ${
            sm && !background && "l0"
          }`}
          onChange={(e) => setText(e.target.value)}
          style={{
            paddingTop: `${paddingTop}%`,
          }}
        ></textarea>
      </div>
      <div className={!type2 ? "post_emojis_wrap " : ""}>
        {picker && (
          <div
            className={`comment_emoji_picker  ${
              type2 ? "movepicker2 " : "rlmove "
            }`}
          >
            {/* Updated prop name: onEmojiClick */}
            <Picker 
            searchDisabled = {true}
            lazyLoadEmojis = {true}
           
            emojiStyle = {EmojiStyle.APPLE}
            theme="dark"
            width  = {350}
            height = {300}
            onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && (
          <img
            src='../../../icons/colorful.png'
            alt=''
            
            onClick={() => {
              setShowBgs((prev) => !prev);
            }}
          />
        )}
        {!type2 && showBgs && (
          <div className='post_backgrounds'>
            <div
              className='no_bg'
              onClick={() => {
                removeBackground();
              }}
            ></div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt=''
                onClick={() => {
                  backgroundHandler(i);
                }}
              />
            ))}
          </div>
        )}

        <div className='flex gap-2'>
          <i
            className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          ></i>
          <div
            className='post_header_right hover1'
            onClick={() => {
              setShowPrev(true);
            }}
          >
            <Photo color='#45bd62' />
          </div>
        </div>
      </div>
    </div>
  );
}
