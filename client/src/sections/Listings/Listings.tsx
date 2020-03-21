import React, { useReducer } from "react";
import { useQuery, useMutation } from "react-apollo";
import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables
} from "./__generated__/DeleteListing";
import { gql } from "apollo-boost";
import { Alert, List, Avatar, Button, Spin } from "antd";
import "./Listings.css";
import { ListingSkeleton } from "./components";

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
      title
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title = "Listings" }: Props) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);
  const [
    fireDeletion,
    { loading: deletionLoading, error: deletionError }
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);
  const listings = data ? data.listings : [];

  const deleteListing = (id: string) => async () => {
    await fireDeletion({ variables: { id } });
    refetch();
  };

  if (loading) {
    return (
      <div className="listings">
        <ListingSkeleton title={title} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="listings">
        <ListingSkeleton title={title} error={true} />
      </div>
    );
  }

  const errorAlert = deletionError ? (
    <Alert
      className="listings__alert"
      type={"error"}
      message="Deletion went wrong - please try again later."
    />
  ) : null;

  return (
    <div className="listings">
      <Spin spinning={deletionLoading}>
        {errorAlert}
        <h2>{title}</h2>
        {listings.length > 0 && (
          <List
            itemLayout="horizontal"
            dataSource={listings}
            renderItem={listing => (
              <List.Item
                key={listing.id}
                actions={[
                  <Button type={"primary"} onClick={deleteListing(listing.id)}>
                    Delete
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src={listing.image} shape="square" size={48} />
                  }
                  title={listing.title}
                  description={listing.address}
                />
              </List.Item>
            )}
          />
        )}
      </Spin>
    </div>
  );
};
