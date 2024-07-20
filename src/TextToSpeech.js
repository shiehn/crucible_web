class TextToSpeech {
  constructor() {
    const voices = window.speechSynthesis.getVoices();
    this.voice = voices.find(voice => voice.lang === 'en-US');
    this.synth = window.speechSynthesis;
    this.utterance = null;
  }

  speak(text, onStart, onEnd) {

    //this.cancel()

    console.log("Speaking:", text);

    if ('speechSynthesis' in window) {
      this.utterance = new SpeechSynthesisUtterance(text);
      this.utterance.voice = this.voice;
      this.utterance.pitch = 1;
      this.utterance.rate = 1.2;
      this.utterance.volume = 1;

      this.utterance.onstart = () => {
        console.log("Speech has started");
        if (onStart) onStart();
      };

      this.utterance.onend = () => {
        console.log("Speech has ended");
        if (onEnd) onEnd();
      };

      this.utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
      };

      this.synth.speak(this.utterance);
    } else {
      console.error("Browser does not support speech synthesis");
    }
  }

  cancel() {
    if (this.synth.speaking) {
      this.synth.cancel();
      console.log("Speech has been canceled");
    }
  }
}

export default TextToSpeech;
