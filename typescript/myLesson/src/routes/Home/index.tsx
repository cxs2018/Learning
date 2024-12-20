import React, { PropsWithChildren } from "react";
import "./index.less";
import HomeHeader from "./components/HomeHeader";
import { CombinedState, HomeState } from "@/typings/state";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import mapDispatchToProps from "@/store/actions/home";

type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps
>;

function Home(props: Props) {
  return <HomeHeader />;
}

const mapStateToProps = (state: CombinedState): HomeState => state.home;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
