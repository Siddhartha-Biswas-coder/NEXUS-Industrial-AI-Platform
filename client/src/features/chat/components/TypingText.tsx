import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
}

const TypingText = ({ text }: TypingTextProps) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");

    let index = 0;

    const interval = setInterval(() => {
      index++;

      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 15);

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return <p className="whitespace-pre-wrap leading-relaxed">{displayed}</p>;
};

export default TypingText;
