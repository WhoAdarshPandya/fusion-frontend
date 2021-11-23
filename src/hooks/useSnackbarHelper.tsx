// import { IconButton } from "@material-ui/core";
// import { useSnackbar, VariantType } from "notistack";
// import CloseIcon from "@material-ui/icons/Close";
export {};
// export const useSnackbarHelper = (): {
//   snackbarInjector: (
//     variant: VariantType,
//     msg: string,
//     closeable: boolean,
//     duration: string
//   ) => void;
// } => {
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
//   const snackbarInjector = (
//     variant: VariantType,
//     msg: string,
//     closeable: boolean,
//     duration: string
//   ) => {
//     enqueueSnackbar(msg, {
//       variant,
//       autoHideDuration: +duration,
//       preventDuplicate: true,
//       action: (key) =>
//         closeable && (
//           <IconButton
//             onClick={() => {
//               closeSnackbar(key);
//             }}
//           >
//             <CloseIcon className="white" />
//           </IconButton>
//         ),
//     });
//   };
//   return { snackbarInjector };
// };
