import React, { useReducer } from "react";
import { server, useQuery } from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData
} from "./types";

const LISTINGS = `
  query Listings{
    listings{
      id,
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

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!){
    deleteListing(id: $id){
      id,
      title
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title = "Listings" }: Props) => {
  const { data, refetch } = useQuery<ListingsData>(LISTINGS);
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
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: { id }
    });
    dispatchDeletionRequest({ type: "cancel", payload: id });
    refetch();
  };

  return (
    <div>
      <h2>{title}</h2>
      {listings.length > 0 ? (
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
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};
