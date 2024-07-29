class GenNumber extends React.Component{
    // This method runs after the component updates
    componentDidUpdate() {
        let time, digit; // Declare time and digit variables

        // Calculate the number of digits to display based on the level
        digit = this.props.level.main + 2;

        // Calculate time to hide the number, increase time if digits are more than 5
        time = 100 * Math.min(digit, 5) + 400 * Math.max(digit - 5, 0);

        // Get the number element from the DOM
        let number = document.getElementById('number');

        // Set a timeout to hide the number after a calculated time
        setTimeout(function () {
            number.innerHTML = number.innerHTML.replace(/\w/gi, '&#183;'); // Replace digits with dots
        }, time);
    }

    // This method runs after the component mounts
    componentDidMount() {
        // Get the number element from the DOM
        let number = document.getElementById('number');

        // Set a timeout to hide the number after 1.2 seconds
        setTimeout(function () {
            number.innerHTML = number.innerHTML.replace(/\w|\W/gi, '&#183;'); // Replace all characters with dots
        }, 1200);
    }

    // Render the component
    render(){
        return /*#__PURE__*/(
            React.createElement("div", { className: "app__gen-number" }, /*#__PURE__*/
            React.createElement("div", { className: "app__info" }, /*#__PURE__*/
            React.createElement("p", { className: "app__level" }, "Level: ", this.props.level.main, " - ", this.props.level.sub), /*#__PURE__*/
            React.createElement("p", { className: "app__wrong" }, "Wrong: ", this.props.wrong, "/3")), /*#__PURE__*/
      
            React.createElement("p", { className: "app__divider" }, "############################"), /*#__PURE__*/
            React.createElement("p", { className: "app__number", id: "number" }, this.props.wrong < 3 ? atob(this.props.question) : '????'), /*#__PURE__*/
            React.createElement("p", { className: "app__divider" }, "############################")));
    }
}

class InputNumber extends React.Component{
    constructor(){
        super();
        // Bind methods to the class instance
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    // Method to handle user input submission
    handleUserInput(e){
        e.preventDefault(); // Prevent the default form submission behavior

        // Encode user input in Base64
        let userNumber = btoa(this.userNumber.value);

        // Clear the input field
        this.userNumber.value = "";

        // Call the compareUserInput method passed via props
        this.props.compareUserInput(userNumber);
    }

    // Method to handle reset button click
    handleReset(){
        this.props.onReset(); // Call the onReset method passed via props
    }

    // Render the component
    render(){
        let layout; // Declare layout variable

        // Conditionally render based on the number of wrong attempts
        if (this.props.wrong < 3) {
            layout = /*#__PURE__*/React.createElement("div", { className: "app__input" }, /*#__PURE__*/
            React.createElement("form", { onSubmit: this.handleUserInput }, "Number is:", /*#__PURE__*/
    
            React.createElement("input", {
                pattern: "[0-9]+", // Only allow numeric input
                type: "text", // Input type text
                ref: ref => this.userNumber = ref, // Reference the input element
                required: true, // Make the input required
                autoFocus: true // Auto focus the input field on render
            }), /*#__PURE__*/
            React.createElement("br", null), /*#__PURE__*/
            React.createElement("br", null)), /*#__PURE__*/
    
            React.createElement("button", { onClick: this.handleReset }, "Restart")); // Render the restart button
        } else {
            layout = /*#__PURE__*/React.createElement("div", { className: "app__end" }, /*#__PURE__*/
            React.createElement("div", { className: "app__notify" }, "Better luck next time (\u2727\u03C9\u2727)"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", { onClick: this.handleReset }, "Restart")); // Render the end message and restart button
        }

        return layout; // Return the layout
    }
}

class App extends React.Component{
    constructor(){
        super();
        // Bind methods to the class instance
        this.compareUserInput = this.compareUserInput.bind(this);
        this.randomGenerate = this.randomGenerate.bind(this);
        this.resetState = this.resetState.bind(this);

        // Set the initial state
        this.state = {
            question: btoa(this.randomGenerate(2)), // Generate the initial question
            level: { main: 1, sub: 1 }, // Set the initial level
            wrong: 0 // Set the initial wrong attempts
        };
    }

    // Method to reset the state
    resetState(){
        this.setState({
            question: btoa(this.randomGenerate(2)), // Generate a new question
            level: { main: 1, sub: 1 }, // Reset the level
            wrong: 0 // Reset the wrong attempts
        });
    }

    // Method to generate a random number with a given number of digits
    randomGenerate(digit){
        let max = Math.pow(10, digit) - 1; // Calculate the maximum value
        let min = Math.pow(10, digit - 1); // Calculate the minimum value

        return Math.floor(Math.random() * (max - min + 1)) + min; // Return a random number within the range
    }

    // Method to compare user input with the current question
    compareUserInput(userNumber){
        let currQuestion = this.state.question; // Get the current question
        let mainLevel = this.state.level.main; // Get the main level
        let subLevel = this.state.level.sub; // Get the sub level
        let wrong = this.state.wrong; // Get the number of wrong attempts
        let digit;

        // Compare the user input with the current question
        if (userNumber === currQuestion) {
            if (subLevel < 3) {
                ++subLevel; // Increment the sub level if less than 3
            } else if (subLevel === 3) {
                ++mainLevel; // Increment the main level if sub level is 3
                subLevel = 1; // Reset the sub level
            }
        } else {
            ++wrong; // Increment the wrong attempts if the input is incorrect
        }

        digit = mainLevel + 2; // Calculate the number of digits for the next question

        // Update the state with the new question, level, and wrong attempts
        this.setState({
            question: btoa(this.randomGenerate(digit)), // Generate a new question
            level: { main: mainLevel, sub: subLevel }, // Update the level
            wrong: wrong // Update the wrong attempts
        });
    }

    // Render the component
    render() {
        return /*#__PURE__*/(
          React.createElement("div", { className: "main__app" }, /*#__PURE__*/
          React.createElement(GenNumber, {
            question: this.state.question,
            level: this.state.level,
            wrong: this.state.wrong }), /*#__PURE__*/
          React.createElement(InputNumber, {
            compareUserInput: this.compareUserInput,
            wrong: this.state.wrong,
            onReset: this.resetState })));
      }
}

// Render the App component into the DOM element with id 'app'
ReactDOM.render(
    React.createElement(App, null),
    document.getElementById('app')
);
