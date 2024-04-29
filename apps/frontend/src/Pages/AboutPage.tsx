import swoosh from "../assets/swoosh.png";
import { Box, Tabs, Tab, Link } from "@mui/material";

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
import { useState } from "react";

import TypeScriptLogo from "../assets/image/tslogo.png";
import ReactLogo from "../assets/image/reactlogo.png";
import YarnLogo from "../assets/image/yarnlogo.png";
import TailwindLogo from "../assets/image/tailwindlogo.png";
import MuiLogo from "../assets/image/muilogo.svg";
import PostgresqlLogo from "../assets/image/postgresqllogo.png";
import PrismaLogo from "../assets/image/prismalogo.svg";
import FramerMotionLogo from "../assets/image/framermotionlogo.svg";
import Auth0Logo from "../assets/image/auth0logo.png";
import AxiosLogo from "../assets/image/axioslogo.png";

import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { GetColorblindColors } from "../components/colorblind.ts";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AboutPage() {
  const [aboutTab, setAboutTab] = useState<number>(0);

  return (
    <Box display="flex" minHeight="100vh">
      <div
        className="
        overflow-y-auto h-screen w-full
        bg-cover bg-center bg-no-repeat
        relative flex flex-col justify-between"
        style={{
          backgroundImage: `url(${swoosh})`,
        }}
      >
        <div className=" top-0 min-w-full pt-8 bg-primary">
          <Box
            sx={{
              backgroundColor: GetColorblindColors().color2,
              borderColor: "white",
              display: "flex",
              justifyContent: "center",
              height: "10vh",
              alignItems: "center",
            }}
          >
            <Tabs
              TabIndicatorProps={{
                sx: { backgroundColor: GetColorblindColors().color3 },
              }}
              value={aboutTab}
              onChange={(event, newValue) => setAboutTab(newValue)}
              aria-label="basic tabs example"
            >
              <Tab
                label="About"
                icon={
                  <PeopleIcon className="mx-2" style={{ fontSize: "2rem" }} />
                }
                sx={{
                  fontSize: "1rem",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  color: "white",
                  "&.Mui-selected": {
                    color: GetColorblindColors().color3,
                  },
                }}
              />
              <Tab
                label="Credits"
                icon={
                  <AssignmentIcon
                    className="mx-2"
                    style={{ fontSize: "2rem" }}
                  />
                }
                sx={{
                  fontSize: "1rem",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  color: "white",
                  "&.Mui-selected": {
                    color: GetColorblindColors().color3,
                  },
                }}
              />
            </Tabs>
          </Box>
        </div>

        <CustomTabPanel value={aboutTab} index={0}>
          <main className="flex-col justify-center items-center leading-none">
            <div
              className="backdrop-blur-md rounded-lg p-10 text-center "
              style={{ backgroundColor: "rgb(103,124,143,0.6)" }}
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Meet our Developers (Hover for favorite quote)
              </h2>
              <div className="flex justify-center flex-wrap gap-4">
                {[
                  {
                    name: "Artem Frenk",
                    image: ArtemFrenk,
                    position1: "Lead Software Engineer",
                    position2: "Full Stack Engineer",
                    position3: "Co-Product Owner",
                    quote: "That's why I charge the prices that I charge",
                  },
                  {
                    name: "Nick Golparvar",
                    image: NickGolparvar,
                    position1: "Assistant Lead Software Engineer",
                    position2: "Full Stack Engineer",
                    quote: "Where's everyone going? Bingo?",
                  },
                  {
                    name: "Hubert Liu",
                    image: HubertLiu,
                    position1: "Assistant Lead Software Engineer",
                    position2: "Full Stack Engineer",
                    quote: "Oops I fell asleep",
                  },
                  {
                    name: "Arjun Venat",
                    image: ArjunVenat,
                    position1: "Assistant Lead Software Engineer",
                    position2: "Full Stack Engineer",
                    quote: '"Yeah put some text over my face"',
                  },
                  {
                    name: "Javier DeLeon",
                    image: JavierDeLeon,
                    position1: "Project Manager",
                    position2: "Full Stack Engineer",
                    quote: "Don't follow in my footsteps, I walk into walls",
                  },
                  {
                    name: "John Diamond",
                    image: JohnDiamond,
                    position1: "Full Stack Engineer",
                    quote: "Placeholder quote",
                  },
                  {
                    name: "Lauren Harrison",
                    image: LaurenHarrison,
                    position1: "Documentation Analyst",
                    position2: "Full Stack Engineer",
                    quote:
                      "Whenever I'm about to do something, I think, 'Would an idiot do that?' And if they would, I do not do that thing. -Dwight Schrute",
                  },
                  {
                    name: "Jessie Hart",
                    image: JessieHart,
                    position1: "Scrum Master",
                    position2: "Co-Product Owner",
                    position3: "Full Stack Engineer",
                    quote:
                      "I've learned that I still have a lot to learn. - Maya Angelou",
                  },
                  {
                    name: "Brannon Henson",
                    image: BrannonHenson,
                    position1: "Full Stack Engineer",
                    quote: "Don't worry, I've shaved the beard.",
                  },
                  {
                    name: "Zihan Li",
                    image: ZihanLi,
                    position1: "Full Stack Engineer",
                    quote: "Placeholder quote",
                  },
                  {
                    name: "Alex Stoyanov",
                    image: AlexanderStoyanov,
                    position1: "Full Stack Engineer",
                    quote: "It works but I don't know why...",
                  },
                ].map((developer, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center gap-2"
                  >
                    <div
                      className="absolute bg-black bg-opacity-50
                                w-[200px] h-[200px] flex flex-col justify-center
                                items-center opacity-0 hover:opacity-100
                                transition-opacity duration-500 ease-in-out
                                z-10 rounded-full"
                    >
                      <p className="text-center text-sm font-semibold text-white">
                        {developer.quote}
                      </p>
                    </div>

                    <img
                      src={developer.image}
                      alt={developer.name}
                      className="transition-all duration-500 ease-in-out
                                transform hover:scale-105 hover:blur-md
                                rounded-full w-[200px] h-[200px] object-cover"
                    />
                    <h3 className="text-center text-lg font-semibold text-primary">
                      {developer.name}
                    </h3>
                    <p className="text-center text-sm font-semibold text-primary">
                      {developer.position1}
                    </p>
                    <p className="text-center text-sm font-semibold text-primary">
                      {developer.position2}
                    </p>
                    <p className="text-center text-sm font-semibold text-primary">
                      {developer.position3}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </CustomTabPanel>
        <CustomTabPanel value={aboutTab} index={1}>
          <main className="flex-col justify-center items-center leading-none">
            <div
              className="backdrop-blur-md rounded-lg p-10 text-center"
              style={{ backgroundColor: "rgb(103,124,143,0.6)" }}
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Software Tools, Libraries, and Frameworks
              </h2>
              <div className="flex justify-center flex-wrap gap-4">
                {[
                  {
                    name: "TypeScript",
                    logo: TypeScriptLogo,
                    link: "https://www.typescriptlang.org/",
                  },
                  {
                    name: "React",
                    logo: ReactLogo,
                    link: "https://reactjs.org/",
                  },
                  {
                    name: "Yarn",
                    logo: YarnLogo,
                    link: "https://yarnpkg.com/",
                  },
                  {
                    name: "Tailwind CSS",
                    logo: TailwindLogo,
                    link: "https://tailwindcss.com/",
                  },
                  {
                    name: "Material-UI",
                    logo: MuiLogo,
                    link: "https://mui.com/",
                  },
                  {
                    name: "PostgreSQL",
                    logo: PostgresqlLogo,
                    link: "https://www.postgresql.org/",
                  },
                  {
                    name: "Prisma",
                    logo: PrismaLogo,
                    link: "https://www.prisma.io/",
                  },
                  {
                    name: "Framer Motion",
                    logo: FramerMotionLogo,
                    link: "https://www.framer.com/motion/",
                  },
                  {
                    name: "Auth0",
                    logo: Auth0Logo,
                    link: "https://www.auth0.com/",
                  },
                  {
                    name: "Axios",
                    logo: AxiosLogo,
                    link: "https://github.com/axios/axios",
                  },
                ].map((tool, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center gap-2"
                  >
                    <Link
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={tool.logo}
                        alt={tool.name}
                        className="transition-all duration-500 ease-in-out
                                    transform hover:scale-105 rounded-lg
                                    w-[200px] h-[200px] object-cover"
                      />
                    </Link>
                    <h3 className="text-center text-lg font-semibold text-primary">
                      {tool.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </CustomTabPanel>

        <div className="flex whitespace-pre items-center justify-center w-full overflow-clip bg-gray-200 py-4 text-center">
          <div className="text-primary">
            WPI Computer Science Department, CS3733-D24 Software Engineering,
            Prof. Wilson Wong
            <a href="http://wilsonwong.org/" target="_blank">
              .
            </a>
          </div>

          <div className="text-primary"> Team Coach: Katy Stuparu</div>
        </div>
      </div>
    </Box>
  );
}
