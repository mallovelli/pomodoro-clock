function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const audio = document.getElementById("beep");

class App extends React.Component {








  constructor(props) {
    super(props);_defineProperty(this, "state", { breakCount: 5, sessionCount: 25, clockCount: 25 * 60, currentTimer: "Session", isPlaying: false });_defineProperty(this, "handlePlayPause",








    () => {
      const { isPlaying, clockCount } = this.state;
      this.buzzer(clockCount);
      if (isPlaying) {
        clearInterval(this.loop);

        this.setState({
          isPlaying: false });

      } else {
        this.setState({
          isPlaying: true });


        this.loop = setInterval(() => {
          const {
            clockCount,
            currentTimer,
            breakCount,
            sessionCount } =
          this.state;

          if (clockCount === 0) {
            this.setState({
              currentTimer: currentTimer === "Session" ? "Break" : "Session",
              clockCount:
              currentTimer === "Session" ? breakCount * 60 : sessionCount * 60 });


            audio.play();
            this.audioBeep.play();
          } else {
            this.setState({
              clockCount: clockCount - 1 });

          }
        }, 1000);
      }
    });_defineProperty(this, "handleReset",






    () => {
      this.setState({
        breakCount: 5,
        sessionCount: 25,
        clockCount: 25 * 60,
        currentTimer: "Session",
        isPlaying: false });


      clearInterval(this.loop);

      audio.pause();
      audio.currentTime = 0;
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
    });_defineProperty(this, "convertToTime",

    count => {
      let minutes = Math.floor(count / 60);
      let seconds = count % 60;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return `${minutes}:${seconds}`;
    });_defineProperty(this, "handleLengthChange",

    (count, timerType) => {
      const { sessionCount, breakCount, isPlaying, currentTimer } = this.state;

      let newCount;

      if (timerType === "session") {
        newCount = sessionCount + count;
      } else {
        newCount = breakCount + count;
      }

      if (newCount > 0 && newCount < 61 && !isPlaying) {
        this.setState({
          [`${timerType}Count`]: newCount });


        if (currentTimer.toLowerCase() === timerType) {
          this.setState({
            clockCount: newCount * 60 });

        }
      }
    });this.loop = undefined;this.buzzer = this.buzzer.bind(this);}componentWillUnmount() {clearInterval(this.loop);}buzzer(clockCount) {if (clockCount === 0) {this.audioBeep.play();}}
  render() {
    const {
      breakCount,
      sessionCount,
      clockCount,
      currentTimer,
      isPlaying } =
    this.state;

    const breakProps = {
      title: "Break",
      count: breakCount,
      handleDecrease: () => this.handleLengthChange(-1, "break"),
      handleIncrease: () => this.handleLengthChange(1, "break") };


    const sessionProps = {
      title: "Session",
      count: sessionCount,
      handleDecrease: () => this.handleLengthChange(-1, "session"),
      handleIncrease: () => this.handleLengthChange(1, "session") };


    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "flex" }, /*#__PURE__*/
      React.createElement(SetTimer, breakProps), /*#__PURE__*/
      React.createElement(SetTimer, sessionProps)), /*#__PURE__*/


      React.createElement("div", { className: "clock-container" }, /*#__PURE__*/
      React.createElement("h1", { id: "timer-label" }, currentTimer), /*#__PURE__*/
      React.createElement("span", { id: "time-left" }, this.convertToTime(clockCount)), /*#__PURE__*/

      React.createElement("div", { className: "flex" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.handlePlayPause }, "Start | Stop", /*#__PURE__*/

      React.createElement("i", { className: `fas fa-${isPlaying ? "pause" : "play"}` })), /*#__PURE__*/

      React.createElement("button", { id: "reset", onClick: this.handleReset }, "Reset", /*#__PURE__*/

      React.createElement("i", { className: "fas fa-sync" })))), /*#__PURE__*/



      React.createElement("audio", {
        id: "beep",
        preload: "auto",
        ref: audio => {
          this.audioBeep = audio;
        },
        src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));



  }}


const SetTimer = props => {
  const id = props.title.toLowerCase();

  return /*#__PURE__*/(
    React.createElement("div", { className: "timer-container" }, /*#__PURE__*/
    React.createElement("h2", { id: `${id}-label` }, props.title, " Length"), /*#__PURE__*/
    React.createElement("div", { className: "flex actions-wrapper" }, /*#__PURE__*/
    React.createElement("button", { id: `${id}-decrement`, onClick: props.handleDecrease }, "Down", /*#__PURE__*/

    React.createElement("i", { className: "fas fa-minus" })), /*#__PURE__*/


    React.createElement("span", { id: `${id}-length` }, props.count), /*#__PURE__*/

    React.createElement("button", { id: `${id}-increment`, onClick: props.handleIncrease }, "Up", /*#__PURE__*/

    React.createElement("i", { className: "fas fa-plus" })))));




};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));