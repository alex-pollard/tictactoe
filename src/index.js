import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Link, Router, Route } from "react-router-dom";

import "antd/dist/antd.css";
import "./index.css";
import { calculateWinner, refreshPage } from "./helpers.js";
import { Layout, Menu, Breadcrumb, Space, Button } from "antd";
import { Typography } from "antd";
import psl from "./psl.png";
import PogButton from "./PogButton";

const { Title } = Typography;
const { Text } = Typography;

const { Header, Sider } = Layout;

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let status;
    const winner = calculateWinner(this.state.squares);
    if (winner) {
      status = "Winner: " + winner;

      return (
        <>
          <text className="status" id="move">
            {status}!
          </text>
          <Button type="primary" onClick={refreshPage}>
            Reset
          </Button>
        </>
      );
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div>
        {/* Endpoint to route to About component */}
        <Link to="./Dashboard.js">hi</Link>
        <Text className="alexGames">Alex's Games - Tic Tac Toe!</Text>
        <br />
        <Text className="status">{status}</Text>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div style={{ alignItems: "center", height: "80vh" }} className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="1">Home</Menu.Item>
        <img src={psl} width="80px" alt="Psl" />
      </Menu>
    </Header>
    <Layout>
      <Sider className="sider">
        <Text className="sideText">
          I did not steal the logo from playstation, they stole it from me.
        </Text>
        <PogButton></PogButton>
      </Sider>
      <Layout style={{ padding: "0 24px 0px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Tic Tac Toe</Breadcrumb.Item>
        </Breadcrumb>

        <Game />
      </Layout>
    </Layout>
  </Layout>,
  document.getElementById("root")
);
