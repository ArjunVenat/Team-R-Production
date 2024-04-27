// import express, { Router, Request, Response } from "express";
// const doctorInformationRouter: Router = express.Router();
// import {Doctor, PrismaClient} from "database";
//
// function filterHelper(requests: Doctor[], reqField: Doctor, filterParam){
//     requests = requests.filter((req) => req.reqField == filterParam);
// }
//
// // Going to be for filtering doctors
// doctorInformationRouter.get("/", async function (req: Request, res: Response) {
//   try {
//     const {
//       deptFilter,
//       yearsFilter,
//       ratingFilter,
//       specTrainFilter,
//       boardCertFilter,
//       languageFilter,
//     } = req.query as {
//       deptFilter: string;
//       yearsFilter: string;
//       ratingFilter: number;
//       specTrainFilter: boolean;
//       boardCertFilter: boolean;
//       languageFilter: string;
//     };
//
//     let doctors: Doctor[] = await PrismaClient.doctor.findMany(
//         {
//             orderBy: [
//                 {
//                     [ratingFilter]: "asc"
//                 },
//             ],
//         },
//     );
//
//
//     }
//   } catch (error) {}
// });
//
// export default doctorInformationRouter;
