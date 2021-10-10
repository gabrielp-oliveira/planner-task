export default function TextAbstract(text, length) {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    const last = text.lastIndexOf(" ");
    if(last !== -1){
        return text.substring(0, last) + "...";
    }else{
        return text.substring(0, length) + '...'
    }
}