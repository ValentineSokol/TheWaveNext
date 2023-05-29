import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
export const Spinner = ({ children, isLoading }) => isLoading ? <FontAwesomeIcon icon={faSpinner} spin />  : children;
