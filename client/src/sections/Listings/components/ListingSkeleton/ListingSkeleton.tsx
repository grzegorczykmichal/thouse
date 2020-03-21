import React from "react";
import { Skeleton, Divider, Alert } from "antd";
import "./ListingSkeleton.css";

interface Props {
  title: string;
  error?: boolean;
}

export const ListingSkeleton = ({ title, error = false }: Props) => {
  const errorAlert = error ? (
    <Alert
      className="listings-skeleton__alert"
      type={"error"}
      message="Something went wrong - please try again later."
    />
  ) : null;

  return (
    <div className="listings-skeleton">
      {errorAlert}
      <h2>{title}</h2>
      <Skeleton paragraph={{ rows: 1 }} active />
      <Divider />
      <Skeleton paragraph={{ rows: 1 }} active />
      <Divider />
      <Skeleton paragraph={{ rows: 1 }} active />
    </div>
  );
};
