import { v4 } from "uuid";
import io, { Socket } from "socket.io-client";
import Cookies from "js-cookie";

export const getUuid = (): string => v4();

export const getBaseUrl = (): string => {
  const mode = import.meta.env.MODE;
  return mode === "development"
    ? "http://localhost:2002"
    : 'https"//fusionapi.herokuapp.com';
};

const socket = io(getBaseUrl());

export const getSocket = (): Socket => {
  return socket;
};

export const socketEmitter = (event: string, data: any): void => {
  socket.emit(event, data);
};

export const getToken = (): string | undefined => {
  return Cookies.get("token");
};

export const setToken = (token: string): void => {
  Cookies.set("token", token);
};

export const setIsLoggedIn = (isLoggedIn: boolean): void => {
  Cookies.set("isLoggedIn", String(isLoggedIn));
};

export const getIsLoggedIn = (): string | undefined => {
  return Cookies.get("isLoggedIn");
};

export const getLoginSvgs = () => {
  return [
    "https://res.cloudinary.com/dvi7v1uqh/image/upload/v1635435571/svgs/svg4_cuwjpn.svg",
    "https://res.cloudinary.com/dvi7v1uqh/image/upload/v1635435571/svgs/svg1_dwyzlv.svg",
  ];
};

export const getSignupSvgs = () => {
  return [
    "https://res.cloudinary.com/dvi7v1uqh/image/upload/v1635435571/svgs/svg3_cgsxxb.svg",
    "https://res.cloudinary.com/dvi7v1uqh/image/upload/v1635435571/svgs/svg2_ewvqt4.svg",
  ];
};

// socket.on(`AnoReq${this.props.user_id}`, async ({ data }) => {
//     this.setState({ renderAnonymousRequestSent: true });
//   });
//   socket.on(`AnoReqInvite${this.props.user_id}`, async ({ data }) => [
//     this.setState({ renderAnonymousRequestFound: true }),
//   ]);
//   socket.emit("join", {
//     name: this.props.name,
//     room: this.props.friend_room,
//   });
//   socket.on(`new_msg`, ({ name, room, msg, id }) => {
//     this.setState({
//       messages: [
//         ...this.state.messages,
//         new Message({ id: id === socket.id ? 0 : 1, message: msg }),
//       ],
//       renderEmptyChat: false,
//     });
//   });
