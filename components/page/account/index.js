import React from "react";
import { PrimaryButton } from "components/button";
import { SEO } from "components/SEO";
import Link from "next/link";
import Card from "components/card";

export default function Account() {
  return (
    <div className="bg-primary pt-20 h-full">
      <SEO
        title={"My profile"}
      ></SEO>
      <div className="container">
        <div className="rounded-full py-3 px-4 bg-gray">
          <div className="rounded-full w-20 bg-secondary py-3 text-center">Owned</div>
        </div>
        <div className="grid grid-cols-6 gap-10">
          <Card
            image={
              "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1df2cac7-72c3-4df3-9c6f-2f7f3df0c068/df6kwk4-781c9807-5f79-4ca1-ac29-4958e1f1e7e5.jpg/v1/fill/w_583,h_350,q_70,strp/life_in_the_universe_by_ururuty_df6kwk4-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY4IiwicGF0aCI6IlwvZlwvMWRmMmNhYzctNzJjMy00ZGYzLTljNmYtMmY3ZjNkZjBjMDY4XC9kZjZrd2s0LTc4MWM5ODA3LTVmNzktNGNhMS1hYzI5LTQ5NThlMWYxZTdlNS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.vQFAVjiMTCci6WbQY7TI6t1Yn438-HRAZ4ADNyVA-MQ"
            }
            price={"1"}
            name={"sdvvrr"}
          />
          <Card
            image={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSju4zcnG2vlzfuZoqscGo3NkHtEMeVYLiVSw&usqp=CAU"
            }
            price={"1"}
            name={"sdvvrr"}
          />
          <Card
            image={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSju4zcnG2vlzfuZoqscGo3NkHtEMeVYLiVSw&usqp=CAU"
            }
            price={"1"}
            name={"sdvvrr"}
          />
          <Card
            image={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSju4zcnG2vlzfuZoqscGo3NkHtEMeVYLiVSw&usqp=CAU"
            }
            price={"1"}
            name={"sdvvrr"}
          />
        </div>
      </div>
    </div>
  );
}
