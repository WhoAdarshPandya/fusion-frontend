import { Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getSignupSvgs } from "../../utils";
import "./Signup.css";

export const Signup = () => {
  const arr = getSignupSvgs();
  return (
    <Paper elevation={0} className="login-container">
      <div className="features">
        <div className="feature-svg">
          <div className="sqaure reverse">
            <img src={arr[0]} className="svg-image" alt="hero-img" />
            <Typography color="textSecondary" align="justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              animi molestias enim accusantium nemo nam, suscipit laudantium
              fuga ex saepe quibusdam fugit quisquam delectus? Vel consequuntur
              aliquam fugiat est facere.
            </Typography>
          </div>
        </div>
        <div className="feature-svg2">
          <div className="sqaure ">
            <img src={arr[1]} className="svg-image" alt="hero-img" />
            <Typography color="textSecondary" align="justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              animi molestias enim accusantium nemo nam, suscipit laudantium
              fuga ex saepe quibusdam fugit quisquam delectus? Vel consequuntur
              aliquam fugiat est facere.
            </Typography>
          </div>
        </div>
      </div>
      <div className="renderer">
        <div className="login-items-container">
          <img
            className="logo"
            src="https://res.cloudinary.com/dvi7v1uqh/image/upload/v1635440539/svgs/vite_lknxsn.svg"
            alt="logo"
          />
        </div>
      </div>
    </Paper>
  );
};
