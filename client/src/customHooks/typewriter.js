const divs = new Set();

const Typewriter = (text, div) => {
    if(!text || !div) return;

    // Avoid retyping and overlapping
    if(!divs.has(div)) {
        divs.add(div);
    } else {
        // Return if the div is being typed currently
        return;
    }

    let typingDelay = 80;
    let charIndex = 0;

    div.textContent = "";
    const type = () => {
        if(charIndex < text.length) {
            div.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type.bind(this, text), typingDelay);
        } else {
            divs.delete(div);
        }
    }

    type();
}

export default Typewriter;