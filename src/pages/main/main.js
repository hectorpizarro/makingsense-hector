import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import Loader from "../../shared/loader/loader";
import { fetchCharacters } from "./ducks";

const Main = ({ curPage, byPage, page }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacters(curPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("page", page);
  if (!byPage[curPage]) {
    return <Loader />;
  }

  return (
    <div>
      <div>Page: {curPage}</div>
      <div>Contents: ---</div>
    </div>
  );
};

Main.propTypes = {
  curPage: PropTypes.number.isRequired,
  byPage: PropTypes.object,
  page: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  curPage: state.characters.curPage,
  byPage: state.characters.byPage
});

export default connect(mapStateToProps)(Main);
