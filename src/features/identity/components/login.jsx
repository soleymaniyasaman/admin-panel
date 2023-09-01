import logo from "@assets/images/logo.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h2">{t("register.title")}</h1>
        <p className="lead">{t("register.introMessage")} </p>
        <p className="lead">
          {t("register.areNotRegistered")}{" "}
          <Link to="/register" className="me-2">
            {t("register.register")}{" "}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form>
              <div className="mb-3">
                <label className="form-label">{t("register.mobile")}</label>
                <input className="form-control form-control-lg" />
              </div>
              <div className="mb-3">
                <label className="form-label">{t("register.password")}</label>
                <input
                  className="form-control form-control-lg mb-2"
                  type="password"
                />
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-lg btn-primary">
                  {t("register.signin")}{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
