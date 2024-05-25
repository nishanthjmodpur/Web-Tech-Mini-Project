import React from "react";
import logo from "/home/nishanth/Public/college/sem3/wt/CricketDirectory/CricketDirectory/src/images/logo.jpeg"

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: "default",
    };
  }

  handlePageChange = (page) => {
    this.setState({ selectedPage: page });
    this.props.onPageChange(page);
  };

  render() {
    const { selectedPage } = this.state;

    return (
      <div>
        <nav className="navbar">
          <img
            src={logo}
            className="logo"
            alt="Your Logo"
            onClick={() => this.handlePageChange("default")}
          />
          <h3
            id="currentSeries"
            className={selectedPage === "currentSeries" ? "active" : ""}
            onClick={() => this.handlePageChange("currentSeries")}
          >
           Upcoming Series
          </h3>
          <h3
            id="currentMatches"
            className={selectedPage === "currentMatches" ? "active" : ""}
            onClick={() => this.handlePageChange("currentMatches")}
          >
            Upcoming Matches
          </h3>
          <h3
            id="playerStats"
            className={selectedPage === "playerStats" ? "active" : ""}
            onClick={() => this.handlePageChange("playerStats")}
          >
            Trending Players
          </h3>
          <h3
            id="recentResults"
            className={selectedPage === "recentResults" ? "active" : ""}
            onClick={() => this.handlePageChange("recentResults")}
          >
            Recent Results
          </h3>
          <a
            id="contact"
            className="cta"
            onClick={() => this.handlePageChange("contact")}
          >
            <button>Contact</button>
          </a>
        </nav>
      </div>
    );
  }
}

export default Navbar;
