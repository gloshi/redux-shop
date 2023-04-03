import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSingForm from "./UserSingForm";
import styles from "../../styles/User.module.css";
import { toggleForm, toggleFormType } from "../../features/user/userSlice";
import UserLoginForm from "./UserLoginForm";

const UserForm = () => {
  const { showForm, formType } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const toggleCurrentFormType = (type) => dispatch(toggleFormType(type));
  return showForm ? (
    <>
      <div className={styles.overlay}></div>
      {formType === "signup" ? (
        <UserSingForm toggleCurrentFormType={toggleCurrentFormType} />
      ) : (
        <UserLoginForm toggleCurrentFormType={toggleCurrentFormType} />
      )}
    </>
  ) : (
    <></>
  );
};

export default UserForm;
