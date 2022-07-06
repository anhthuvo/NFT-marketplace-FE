import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

const ScrollContext = createContext({});

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case "":
      return {};
    default:
      throw new Error();
  }
}

const ScrollProvider = ({ children }) => {
  const [state, setState] = useState({
    section: 0,
    direction: ''
  });

  const scrollTo = (_section) => {
    setState({
        section: _section,
        direction: state.section > _section? 'up': 'down'
    })
  }

  return (
    <ScrollContext.Provider
      value={{
        section: state.section,
        scrollTo
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);

export default ScrollProvider;
