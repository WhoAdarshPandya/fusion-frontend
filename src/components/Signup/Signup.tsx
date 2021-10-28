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
        <Link to="/login">click to login</Link>
      </div>
    </Paper>
  );
};
