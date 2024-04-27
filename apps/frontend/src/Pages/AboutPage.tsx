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

import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";

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
        className="overflow-y-auto h-screen w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${swoosh})`,
        }}
      >
        <div className=" top-0 min-w-full pt-8 bg-primary">
          <Box
            sx={{
              backgroundColor: "#009CA6",
              borderColor: "white",
              display: "flex",
              justifyContent: "center",
              height: "10vh",
              alignItems: "center",
            }}
          >
            <Tabs
              TabIndicatorProps={{ style: { backgroundColor: "#f6bd39" } }}
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
                    color: "#f6bd39",
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
                    color: "#f6bd39",
                  },
                }}
              />
            </Tabs>
          </Box>
        </div>

        <CustomTabPanel value={aboutTab} index={0}>
          <main className="flex flex-col justify-center items-center leading-none">
            <div
              className="backdrop-blur-md rounded-lg p-10 text-center"
              style={{
                backgroundColor: "rgb(103,124,143, 0.6)",
              }}
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Meet our Developers
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    name: "Artem Frenk",
                    image: ArtemFrenk,
                    position1: "Lead Software Engineer",
                    position2: "Full Stack Engineer",
                    position3: "Co-Product Owner",
                  },
                  {
                    name: "Nick Golparvar",
                    image: NickGolparvar,
                    position1: "Assistant Lead Software Engineer",
                    position2: "Full Stack Engineer",
                  },
                  {
                    name: "Hubert Liu",
                    image: HubertLiu,
                    position1: "Assistant Lead Software Engineer",
                    position2: "Full Stack Engineer",
                  },
                  {
                    name: "Arjun Venat",
                    image: ArjunVenat,
                    position1: "Assistant Lead Software Engineer",
                    position2: "Full Stack Engineer",
                  },
                  {
                    name: "Javier DeLeon",
                    image: JavierDeLeon,
                    position1: "Project Manager",
                    position2: "Full Stack Engineer",
                  },
                  {
                    name: "John Diamond",
                    image: JohnDiamond,
                    position1: "Full Stack Engineer",
                  },
                  {
                    name: "Lauren Harrison",
                    image: LaurenHarrison,
                    position1: "Documentation Analyst",
                    position2: "Full Stack Engineer",
                  },
                  {
                    name: "Jessie Hart",
                    image: JessieHart,
                    position1: "Scrum Master",
                    position2: "Co-Product Owner",
                    position3: "Full Stack Engineer",
                  },
                  {
                    name: "Brannon Henson",
                    image: BrannonHenson,
                    position1: "Full Stack Engineer",
                  },
                  {
                    name: "Zihan Li",
                    image: ZihanLi,
                    position1: "Full Stack Engineer",
                  },
                  {
                    name: "Alex Stoyanov",
                    image: AlexanderStoyanov,
                    position1: "Full Stack Engineer",
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
                    <p className="text-center text-sm font-semibold text-primary">
                      {developer.position1}
                    </p>
                    <p className="text-center text-sm font-semibold text-primary">
                      {developer.position2}
                    </p>
                    <p className="text-center text-sm  font-semibold text-primary">
                      {developer.position3}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </CustomTabPanel>
        <CustomTabPanel value={aboutTab} index={1}>
          <div className="flex flex-col items-center gap-2 min-h-screen overflow-y-auto">
            <div
              className="backdrop-blur-md rounded-lg p-10 text-center"
              style={{
                backgroundColor: "rgb(103,124,143, 0.6)",
              }}
            >
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
          </div>
        </CustomTabPanel>

        <div className="flex flex-col items-center justify-center w-full overflow-clip bottom-0 bg-gray-200 py-4 mt-4 text-center">
          <div className="text-primary">
            WPI Computer Science Department, CS3733-D24 Software Engineering,
            Prof. Wilson Wong
          </div>
          <div className="text-primary">Team Coach: Katy Stuparu</div>
        </div>
      </div>
    </Box>
  );
}
