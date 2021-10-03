const usTypewriter = (text, div) => {
    if(!text || !div) return;

    let typingDelay = 80;
    let charIndex = 0;

    div.textContent = "";
    const type = () => {
        if(charIndex < text.length) {
            div.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type.bind(this, text), typingDelay);
        }
    }

    type();
}

export default usTypewriter;