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
            <h2 className="text-2xl font-bold mb-4 text-primary">Developers</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Javier DeLeon", image: JavierDeLeon },
                { name: "John Diamond", image: JohnDiamond },
                { name: "Artem Frenk", image: ArtemFrenk },
                { name: "Nick Golparvar", image: NickGolparvar },
                { name: "Lauren Harrison", image: LaurenHarrison },
                { name: "Jessie Hart", image: JessieHart },
                { name: "Brannon Henson", image: BrannonHenson },
                { name: "Zihan Li", image: ZihanLi },
                { name: "Hubert Liu", image: HubertLiu },
                { name: "Alex Stoyanov", image: AlexanderStoyanov },
                { name: "Arjun Venat", image: ArjunVenat },
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
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </Box>
  );
}
