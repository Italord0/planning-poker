import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import CardChoice from "../../components/cardChoice";
import cardChoiceContainerStyle from "../../styles/cardChoiceContainer.module.css";
import bottomInteractContainerStyle from "../../styles/bottomInteractContainer.module.css";

export default function Game() {

  const router = useRouter();

  const gameId = router.query.id;

  const [joined, setJoined] = useState(false);

  let nameTextInput = React.createRef();

  function enterRoom(name) {
    console.log("Enter room function")
    // TODO: change socket address to production
    const socket = io(`http://192.168.1.66:3001`);
    socket.on("connect", () => {
      console.log("connected")
    })
    socket.on("message", (message) => {
      console.log(message)
    })
    socket.on("users", (users) => {
      console.log(users)
    })
    socket.emit("join", { "gameId": gameId, name: name });
    setJoined(true);
  }

  return (
    <div className="game">
      <div className="game__container">
        <div className="game__header">
          <h1 className="game__title">Game {gameId}</h1>
        </div>
        <div className="game__content">
          {!joined && (
            <div className="game__join">
              <h2 className="game__join-title">Join the game</h2>
              <input
                type="text"
                className="game__join-input"
                placeholder="Enter your name"
                ref={nameTextInput}
              />
              <button
                className="game__join-button"
                onClick={() => enterRoom(nameTextInput.current.value)}
              >
                Join
              </button>
            </div>
          )}
          {joined && (
            <div className="game__joined">
              <h2 className="game__joined-title">Joined</h2>
              <p className="game__joined-text">
                You have joined the game.
              </p>
              <div className={bottomInteractContainerStyle.background}>
                <div className={cardChoiceContainerStyle.background}>
                  <CardChoice number="1" onClick={() => { console.log("Card pressed") }} />
                  <CardChoice number="2" onClick={() => { console.log("Card pressed") }} />
                  <CardChoice number="3" onClick={() => { console.log("Card pressed") }} />
                  <CardChoice number="5" onClick={() => { console.log("Card pressed") }} />
                  <CardChoice number="8" onClick={() => { console.log("Card pressed") }} />
                  <CardChoice number="13" onClick={() => { console.log("Card pressed") }} />
                  <CardChoice number="21" onClick={() => { console.log("Card pressed") }} />
                </div>
                <p className ={bottomInteractContainerStyle.gameStatus} >Pick a card</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}