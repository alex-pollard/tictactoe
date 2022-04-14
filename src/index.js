import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { calculateWinner, refreshPage } from "./helpers.js";
import { Layout, Menu, Breadcrumb, Typography, Space, Button } from "antd";
import psl from "./psl.png";

const { Header, Sider } = Layout;
const { Title } = Typography;

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
          <Title className="status">{status}!</Title>
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
        <Title>Tic Tac Toe!</Title>
        <Title level={3}>{status}</Title>
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
      <Sider width={200} theme="light" className="site-layout-background">
        <Title type={2}>
          I did not steal the logo from playstation, they stole it from me.
        </Title>
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
