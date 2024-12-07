import React from "react";
import "./index.less";
import HomeHeader from "./components/HomeHeader";
import { CombinedState, HomeState } from "@/typings/state";
import { connect } from "react-redux";

interface Props {}

function Home(props: Props) {
  return <HomeHeader />;
}

const mapStateToProps = (state: CombinedState): HomeState => state.home;

export default connect(mapStateToProps)(Home);
