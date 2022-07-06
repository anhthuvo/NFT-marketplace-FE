import React, { useRef, useEffect, useState } from "react";
import { Window, SlideWrapper, Slide } from "./styled";
import { useScroll } from "store/useScroll";

export default function VerticalSlider({ data }) {
  const { section, scrollTo } = useScroll();
  const clickable = useRef(true);
  const delay = useRef(1000).current;

  const debounce = (action, time) => {
    if (!clickable.current) return;
    clickable.current = false;
    setTimeout(() => {
      clickable.current = true;
    }, time);
    action();
  };

  useEffect(() => {
    let _section = 0;
    let touchstartY = 0;

    const handleScrollMouse = (event) => {
      debounce(() => {
        if (event.deltaY > 0) {
          if (_section + 1 >= data.length) return;
          _section += 1;
          scrollTo(_section);
        } else {
          if (_section - 1 < 0) return;
          _section -= 1;
          scrollTo(_section);
        }
      }, delay);
    };

    const handleSwipe = (event) => {
      const y = event?.changedTouches?.[0]?.clientY;
      if (!y || touchstartY === 0) return;
      if (y < touchstartY) {
        if (_section + 1 >= data.length) return;
        _section += 1;
        scrollTo(_section);
      } else {
        if (_section - 1 < 0) return;
        _section -= 1;
        scrollTo(_section);
      }
      touchstartY = 0;
    };

    const _touchStart = (event) => {
      debounce(() => {
        const y = event?.changedTouches?.[0]?.clientY;
        if (!y) return;
        touchstartY = y;
      }, delay);
    };

    document.addEventListener("wheel", handleScrollMouse);
    document.addEventListener("touchstart", _touchStart);
    document.addEventListener("touchend", handleSwipe);

    return () => {
      document.removeEventListener("wheel", handleScrollMouse);
      document.removeEventListener("touchstart", _touchStart);
      document.removeEventListener("touchend", handleSwipe);
    };
  }, []);

  return (
    <Window>
      <SlideWrapper index={section} slideTotal={data.length} duration={delay}>
        {data.map((e, index) => (
          <Slide key={index}>
            {e.component}
          </Slide>
        ))}
      </SlideWrapper>
    </Window>
  );
}
