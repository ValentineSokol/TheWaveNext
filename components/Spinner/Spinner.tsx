import React, {HTMLAttributes} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {Text} from "@/components/Text/Text";
import styles from './Spinner.module.scss';
export const Spinner = ({ ...props } : HTMLAttributes<HTMLSpanElement>) => <Text className={styles.spinner} {...props} ><FontAwesomeIcon icon={faSpinner} spin /></Text>;
