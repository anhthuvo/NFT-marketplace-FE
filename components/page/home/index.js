import React from "react";
import Image from "components/Image";
import { Section, Section6, IframeWrapper, Animation } from "./styled";
import { PrimaryButton } from "components/button";
import { useTranslation } from "next-i18next";
import { SEO } from "components/SEO";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Link from "next/link";
import { useWebp, useWindowDimensions } from "../../../utils";
import VerticalSlider from "components/VerticalSlider";
import Section1 from './components/Section1';
import Section2 from './components/Section2';

export default function Home() {

  const DATA = [
    {
      component: <Section1/>
    },
    {
      component: <Section2/>
    }
  ];

  return (
    <div className="bg-white">
      <SEO
        title={'Everly NFTs'}
        description={""}
        url={""}
      ></SEO>
      <VerticalSlider
      data={DATA}
      />
    </div>
  );
}
