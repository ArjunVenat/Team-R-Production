import swoosh from "../assets/swoosh.png";
import { Box, Link } from "@mui/material";

export default function CreditsPage() {
  return (
    <Box display="flex">
      <div className=" top-0 pt-8 bg-primary flex justify-center items-center w-full h-full ">
        <div
          className="flex items-center justify-center min-h-dvh w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${swoosh})`,
            // width: "100vw",
            // height: "100vh",
          }}
        >
          <main className="flex h-full content-center justify-center leading-none relative">
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
            </div>
          </main>
        </div>
      </div>
    </Box>
  );
}
