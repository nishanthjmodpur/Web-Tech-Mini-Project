import React from "react"
import Main from "./container/Main"
import Navbar from "./container/Navbar"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 'default', // Initial selected page
    };
  }

  handlePageChange = (page) => {
    this.setState({ selectedPage: page });
  };

  render() {
    return (
      <div>
        <Navbar onPageChange={this.handlePageChange} />
        <Main selectedPage={this.state.selectedPage} />
      </div>
    );
  }
}

export default App;
