import SideBar from "../components/SideBar.tsx";
import blueback from "../assets/blueback.png";
import { Box } from "@mui/material";

import AlexanderStoyanov from "../assets/image/AlexanderStoyanov.jpg";
import ArjunVenat from "../assets/image/ArjunVenat.jpg";
import ArtemFrenk from "../assets/image/ArtemFrenk.jpg";
import BrannonHenson from "../assets/image/BrannonHenson.jpeg";
import HubertLiu from "../assets/image/HubertLiu.jpg";
import JavierDeLeon from "../assets/image/JavierDeLeon.jpg";
import JessieHart from "../assets/image/JessieHart.jpg";
import JohnDiamond from "../assets/image/JohnDiamond.jpg";
import LaurenHarrison from "../assets/image/LaurenHarrison.jpg";
import NickGolparvar from "../assets/image/NickGolparvar.jpeg";
import ZihanLi from "../assets/image/ZihanLi.jpg";

export default function AboutPage() {
  return (
    <Box display="flex">
      <SideBar />
      <div
        className="overflow-y-auto h-screen flex-grow justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${blueback})`,
          width: "100vw",
          height: "100vh",
        }}
      >
        <main className="flex content-center justify-center leading-none relative">
          <div className="flex flex-col items-center justify-center gap-8">
            <h1 className="text-5xl font-semibold text-primary mb-2 mt-8">
              WPI Computer Science Department
            </h1>
            <h2 className="text-4xl font-semibold text-primary mb-2">
              CS3733-D24 Software Engineering
            </h2>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              Prof. Wilson Wong
            </h2>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              Team Coach: Katy Stuparu
            </h2>
            <h3 className="text-2xl font-bold mb-4 text-primary mt-10">
              Developers
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  name: "Javier DeLeon",
                  positions: ["Project Manager", "Front End Developer"],
                  image: JavierDeLeon,
                },
                {
                  name: "John Diamond",
                  positions: ["Back End Developer"],
                  image: JohnDiamond,
                },
                {
                  name: "Artem Frenk",
                  positions: ["Lead", "co-Product Owner", "Back End Developer"],
                  image: ArtemFrenk,
                },
                {
                  name: "Nick Golparvar",
                  positions: ["Assistant Lead", "Back End Developer"],
                  image: NickGolparvar,
                },
                {
                  name: "Lauren Harrison",
                  positions: ["Documentation Analyst", "Front End Developer"],
                  image: LaurenHarrison,
                },
                {
                  name: "Jessie Hart",
                  positions: [
                    "Scrum Master",
                    "co-Product Owner",
                    "Front End Developer",
                  ],
                  image: JessieHart,
                },
                {
                  name: "Brannon Henson",
                  positions: ["Algorithms Developer"],
                  image: BrannonHenson,
                },
                {
                  name: "Zihan Li",
                  positions: ["Front End Developer"],
                  image: ZihanLi,
                },
                {
                  name: "Hubert Liu",
                  positions: ["Assistant Lead", "Algorithms Developer"],
                  image: HubertLiu,
                },
                {
                  name: "Alex Stoyanov",
                  positions: ["Front End Developer"],
                  image: AlexanderStoyanov,
                },
                {
                  name: "Arjun Venat",
                  positions: ["Assistant Lead", "Front End Developer"],
                  image: ArjunVenat,
                },
              ].map((developer, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <img
                    src={developer.image}
                    alt={developer.name}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 className="text-center text-lg font-semibold text-primary">
                    {developer.name}
                  </h3>
                  {developer.positions.map((position, positionIndex) => (
                    <p
                      key={positionIndex}
                      className="text-center text-sm text-gray-500"
                    >
                      {position}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </main>
        {/*<div className="absolute bottom-8 right-2 text-primary">
              WPI Computer Science Department, CS3733-D24 Software Engineering,
              Prof. Wilson Wong
        </div>
        <div className="absolute bottom-2 right-2 text-primary">
          Team Coach: Katy Stuparu
        </div>*/}
      </div>
    </Box>
  );
}
