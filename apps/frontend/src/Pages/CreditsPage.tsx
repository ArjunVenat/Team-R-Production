import SideBar from "../components/SideBar.tsx";
import blueback from "../assets/blueback.png";
import { Box, Link } from "@mui/material";
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

export default function CreditsPage() {
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
          <div className="flex flex-col items-center justify-start h-full">
            <h1 className="text-4xl font-bold mb-4">Credits</h1>
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-2xl font-bold mb-2">
                Software Tools, Libraries, and Frameworks
              </h2>
              <div className="flex flex-col items-center justify-center gap-1">
                <Link
                  href="https://www.typescriptlang.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TypeScript
                </Link>
                <Link
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React
                </Link>
                <Link
                  href="https://yarnpkg.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Yarn
                </Link>
                <Link
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </Link>
                <Link
                  href="https://mui.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Material-UI
                </Link>
                <Link
                  href="https://www.postgresql.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PostgreSQL
                </Link>
                <Link
                  href="https://www.prisma.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prisma
                </Link>
                <Link
                  href="https://www.framer.com/motion/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Framer Motion
                </Link>
                <Link
                  href="https://www.auth0.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Auth0
                </Link>
                <Link
                  href="https://github.com/axios/axios"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Axios
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-2xl font-bold mb-2">Developers</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={JavierDeLeon}
                    alt="Javier DeLeon"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 className="text-center text-lg font-semibold text-gray-700">
                    {" "}
                    Javier DeLeon
                  </h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={JohnDiamond}
                    alt="John Diamond"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 className="text-center text-lg font-semibold text-gray-700">
                    {" "}
                    John Diamond
                  </h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={ArtemFrenk}
                    alt="Artem Frenk"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 className="text-center text-lg font-semibold text-gray-700">
                    {" "}
                    Artem Frenk
                  </h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={NickGolparvar}
                    alt="Nick Golparvar"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 className="text-center text-lg font-semibold text-gray-700">
                    {" "}
                    Nick Golparvar
                  </h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={LaurenHarrison}
                    alt="Lauren Harrison"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 className="text-center text-lg font-semibold text-gray-700">
                    {" "}
                    Lauren Harrison{" "}
                  </h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={JessieHart}
                    alt="Jessie Hart"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 className="text-center text-lg font-semibold text-gray-700">
                    {" "}
                    Jessie Hart
                  </h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={BrannonHenson}
                    alt="Brannon Henson"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 className="text-center text-lg font-semibold text-gray-700">
                    {" "}
                    Brannon Henson
                  </h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={ZihanLi}
                    alt="Zihan Li"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 className="text-center text-lg font-semibold text-gray-700">
                    {" "}
                    Zihan Li
                  </h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={HubertLiu}
                    alt="Hubert Liu"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 className="text-center text-lg font-semibold text-gray-700">
                    {" "}
                    Hubert Liu
                  </h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={AlexanderStoyanov}
                    alt="Alex Stoyanov"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 className="text-center text-lg font-semibold text-gray-700">
                    {" "}
                    Alex Stoyanov
                  </h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={ArjunVenat}
                    alt="Arjun Venat"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 className="text-center text-lg font-semibold text-gray-700">
                    {" "}
                    Arjun Venat
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Box>
  );
}
