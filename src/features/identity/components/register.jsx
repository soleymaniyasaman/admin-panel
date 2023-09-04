import logo from "@assets/images/logo.svg";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { httpService } from "@core/http-service";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = useSubmit(); // connect registerAction with register by using react-router
  const onSubmit = (data) => {
    const { confirmPassword, ...userData } = data; // sever confirmData from whole data
    submitForm(userData, { method: "post" }); // submit form by using react-router-dom manually
  };

  const navigation = useNavigation();

  const isSubmitting = navigation.state !== "idle"; // if the state of navigation is submitting or loading then return true

  const isSuccessOperation = useActionData(); // useAction data return the data from registerAction that is defined in both router.jsx & register.jsx

  const navigate = useNavigate(); // navigate the route with coding instead of Link

  const routeErrors = useRouteError(); // handle errors of the fetch api

  const { t } = useTranslation(); // use t for multi language

  useEffect(() => {
    if (isSuccessOperation) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [isSuccessOperation]);

  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h2">{t("register.title")}</h1>
        <p className="lead">{t("register.introMessage")} </p>
        <p className="lead">
          {t("register.alreadyRegistered")}{" "}
          <Link to="/login" className="me-2">
            {t("register.signin")}{" "}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t("register.mobile")}</label>
                <input
                  {...register("mobile", {
                    required: true,
                    minLength: 11,
                    maxLength: 11,
                  })}
                  className={`form-control form-control-lg ${
                    errors.mobile && "is-invalid"
                  }`}
                />
                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small fw-bold mb-1">
                    {t("register.validation.mobileRequired")}
                  </p>
                )}
                {errors.mobile &&
                  (errors.mobile.type === "minLength" ||
                    errors.mobile.type === "maxLength") && (
                    <p className="text-danger small fw-bold mb-1">
                      {t("register.validation.mobileLength")}
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t("register.password")}</label>
                <input
                  {...register("password", {
                    required: true,
                  })}
                  className={`form-control form-control-lg ${
                    errors.password && "is-invalid"
                  }`}
                  type="password"
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bold mb-1">
                    {t("register.validation.passwordRequired")}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {t("register.repeatPassword")}
                </label>
                <input
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return t("register.validation.notMatching");
                      }
                    },
                  })}
                  className={`form-control form-control-lg ${
                    errors.confirmPassword && "is-invalid"
                  }`}
                  type="password"
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <p className="text-danger small fw-bold mb-1">
                      {t("login.validation.repeatPasswordRequired")}
                    </p>
                  )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <p className="text-danger small fw-bold mb-1">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg btn-primary"
                >
                  {isSubmitting ? t("register.saving") : t("register.register")}
                </button>
              </div>
              {isSuccessOperation && (
                <div className="alert alert-success text-success p-2 mt-3">
                  {t("register.successOperation")}{" "}
                </div>
              )}
              {routeErrors && (
                <div className="alert alert-danger p-2 mt-3">
                  {routeErrors.response?.data.map((error) => (
                    <p className="mb-0">
                      {t(`register.validation.${error.code}`)}
                    </p>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

export async function registerAction({ request }) {
  const formData = await request.formData(); // return key value data from the form
  const data = Object.fromEntries(formData); // object.fromEntries() convert key value to an object model
  const response = await httpService.post("/Users", data);
  return response.status === 200;
}
