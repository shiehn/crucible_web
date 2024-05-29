class TextToSpeech {
  constructor() {
    const voices = window.speechSynthesis.getVoices();
    this.voice = voices.find(voice => voice.lang === 'en-US');
  }

  speak(text, onStart, onEnd) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.voice;
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        console.log("Speech has started");
        if (onStart) onStart();
      };

      utterance.onend = () => {
        console.log("Speech has ended");
        if (onEnd) onEnd();
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Browser does not support speech synthesis");
    }
  }
}

export default TextToSpeech;
