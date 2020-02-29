import React, { useReducer } from "react";
// import { useQuery, useMutation } from "../../lib/api";
import { useQuery, useMutation } from "react-apollo";
import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables
} from "./__generated__/DeleteListing";
import { gql } from "apollo-boost";
// import {
//   DeleteListingData,
//   DeleteListingVariables,
//   ListingsData
// } from "./types";

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

  const [deletionRequests, dispatchDeletionRequest] = useReducer(
    (state = [], action) => {
      if (action.type === "request") {
        return Array.from(new Set([...state, action.payload]));
      }
      if (action.type === "cancel") {
        return state.filter((id: string) => id !== action.payload);
      }
      return state;
    },
    []
  );
  const cancelRequest = (id: string) => () => {
    dispatchDeletionRequest({ type: "cancel", payload: id });
  };

  const deleteRequest = (id: string) => () => {
    dispatchDeletionRequest({ type: "request", payload: id });
  };

  const deleteListing = (id: string) => async () => {
    await fireDeletion({ variables: { id } });
    dispatchDeletionRequest({ type: "cancel", payload: id });
    refetch();
  };

  if (loading) {
    return <h2>Loading ...</h2>;
  }

  if (error) {
    return <h2>Something went wrong &#x1f480;</h2>;
  }

  const deletionLoadingMessage = deletionLoading ? <h4>Deleting ...</h4> : null;
  const deletionErrormessage = deletionError ? <h4>Err!</h4> : null;

  return (
    <div>
      <h2>{title}</h2>
      {listings.length > 0 && (
        <ul>
          {listings.map(listing => {
            return (
              <li key={listing.id}>
                {listing.title}{" "}
                <div>
                  {deletionRequests.indexOf(listing.id) !== -1 ? (
                    <span>
                      <button onClick={cancelRequest(listing.id)}>
                        cancel
                      </button>
                      <button onClick={deleteListing(listing.id)}>OK</button>
                    </span>
                  ) : (
                    <button onClick={deleteRequest(listing.id)}>delete</button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {deletionLoadingMessage}
      {deletionErrormessage}
    </div>
  );
};
