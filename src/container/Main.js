import React, { useState, useEffect } from "react";
import Feedback from "./Feedback";
import "../style.css";

const Main = ({ selectedPage }) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url) => {
    setLoading(true);

    const headers = {
      "X-RapidAPI-Key": "3061a96626msh28214fe01815586p106190jsna98559b8eabb",
      "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
    };

    try {
      const response = await fetch(url, { headers });
      if (response.ok) {
        const data = await response.json();
        setApiData(data);
      } else {
        console.error("API request failed with status:", response.status);
      }
    } catch (error) {
      console.error("API request failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let url = "";

    switch (selectedPage) {
      case "currentSeries":
        url = "https://cricbuzz-cricket.p.rapidapi.com/series/v1/international";
        fetchData(url);
        break;
      case "currentMatches":
        url =
          "https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/international";
        fetchData(url);
        break;
      case "playerStats":
        url =
          "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/trending";
        fetchData(url);
        break;
      case "recentResults":
        url = "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent";
        fetchData(url);
        break;
      default:
        url = "https://cricbuzz-cricket.p.rapidapi.com/news/v1/index";
        fetchData(url);
        break;
    }

    setApiData(null); // Clear apiData when switching tabs
  }, [selectedPage]);

  let content;

  switch (selectedPage) {
    case "currentSeries":
      content = (
        <div>
          {apiData && apiData.seriesMapProto
            ? apiData.seriesMapProto.map((month, index) => (
                <div key={index} className="series-month">
                  <h2>{month.date}</h2>
                  {month.series.map((series, seriesIndex) => (
                    <div key={seriesIndex} className="series-item">
                      <p>{series.name}</p>
                    </div>
                  ))}
                </div>
              ))
            : "No data available."}
        </div>
      );
      break;

    case "currentMatches":
      content = (
        <div>
          {apiData && apiData.matchScheduleMap
            ? apiData.matchScheduleMap.map((schedule, scheduleIndex) => (
                <div key={scheduleIndex} className="match-schedule">
                  {schedule.scheduleAdWrapper &&
                    schedule.scheduleAdWrapper.date && (
                      <h2>{schedule.scheduleAdWrapper.date}</h2>
                    )}
                  {schedule.scheduleAdWrapper &&
                    schedule.scheduleAdWrapper.matchScheduleList.map(
                      (match, matchIndex) => (
                        <div key={matchIndex} className="match-item">
                          {match.seriesName && (
                            <p>Series: {match.seriesName}</p>
                          )}
                          {match.matchInfo && match.matchInfo[0] && (
                            <p>Match: {match.matchInfo[0].matchDesc}</p>
                          )}
                          {match.matchInfo && match.matchInfo[0] && (
                            <p>Format: {match.matchInfo[0].matchFormat}</p>
                          )}
                          {match.matchInfo &&
                            match.matchInfo[0] &&
                            match.matchInfo[0].team1 &&
                            match.matchInfo[0].team2 && (
                              <p>
                                Teams: {match.matchInfo[0].team1.teamName} vs{" "}
                                {match.matchInfo[0].team2.teamName}
                              </p>
                            )}
                          {schedule.scheduleAdWrapper &&
                            schedule.scheduleAdWrapper.date && (
                              <p>Date: {schedule.scheduleAdWrapper.date}</p>
                            )}
                        </div>
                      )
                    )}
                </div>
              ))
            : "No data available."}
        </div>
      );
      break;

    case "playerStats":
      content = (
        <div className="player-stats">
          <h2 className="player-heading">Trending Players</h2>
          <div className="player-list">
            {apiData && apiData.player
              ? apiData.player.map((player, index) => (
                  <div key={index} className="player-item">
                    <p>Name: {player.name}</p>
                    <p>Team: {player.teamName}</p>
                  </div>
                ))
              : "Loading API data..."}
          </div>
        </div>
      );
      break;

case "recentResults":
  content = apiData ? (
    <div>
      {apiData.typeMatches &&
        apiData.typeMatches[0] &&
        apiData.typeMatches[0].seriesMatches
          ? apiData.typeMatches[0].seriesMatches
              .slice(0, 10)
              .map((seriesMatch, seriesIndex) => (
                <div key={seriesIndex}>
                  {seriesMatch.seriesAdWrapper && (
                    <p className="series-name">{`Series: ${seriesMatch.seriesAdWrapper.seriesName}`}</p>
                  )}
                  {seriesMatch.seriesAdWrapper &&
                    seriesMatch.seriesAdWrapper.matches.map(
                      (match, matchIndex) => (
                        <div key={matchIndex} className="match-item">
                          <p>
                            {`${match.matchInfo.team1.teamName} vs ${match.matchInfo.team2.teamName}`}
                          </p>
                          <p>{`Match: ${match.matchInfo.matchDesc}`}</p>
                          <p>{`Result: ${match.matchInfo.status}`}</p>
                          <hr />
                        </div>
                      )
                    )}
                </div>
              ))
          : "No data available."}
    </div>
  ) : (
    <div>Loading API data...</div>
  );
  break;


    case "contact":
      content = <Feedback />;
      break;

default:
  content = apiData && apiData.storyList ? (
    <div>
      {apiData.storyList.map((item, index) => (
        <div key={index} className="news-item">
          {item.story && item.story.hline && (
            <h2>{item.story.hline}</h2>
          )}
          {item.story && item.story.intro && (
            <p>{item.story.intro}</p>
          )}
        </div>
      ))}
    </div>
  ) : (
    <div>Loading API data...</div>
  );
  break;

  }

  return <div>{content}</div>;
};

export default Main;
