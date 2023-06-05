import React, {useEffect, useState, useId, useRef, useMemo} from "react";
import {Input, InputProps} from "@/components/Input/Input";
import {useDebounce} from "@/utils/hooks/useDebounce";
import {useSearch} from '@/api/SearchApi';
import Link from "next/link";
import styles from './SearchInput.module.scss';
import {Spinner} from "@/components/Spinner/Spinner";
import {OutsideEventBoundary} from "@/components/OutsideEventBoundary/OutsideEventBoundary";
import {ErrorText} from "@/components/ErrorText/ErrorText";
import {Text} from "@/components/Text/Text";
import {Button} from "@/components/Button/Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import {SearchResultFactory} from "@/components/SearchInput/SearchResult/SearchResultFactory";
import clsx from "clsx";
import {Card} from "@/components/Card/Card";

interface SelectedValue {
    name: string,
    id: number,

}
export interface SearchInputProps extends InputProps {

    selectedValues?: SelectedValue[],
    multiSelect?: boolean,
    onResultSelect?: (selectedValues: SelectedValue[], id: number) => void,
    onResultRemove?: (selectedValues: SelectedValue[], id: number) => void,
    entity?: 'all' | 'story' | 'fandom' | 'character',
    wrapClassName?:string,
    inputWrapClassName?:string,
}

export const SearchInput = ({ wrapClassName, selectedValues = [], onResultSelect, onResultRemove, inputWrapClassName, multiSelect = true, entity, label, ...props}: SearchInputProps) => {
    const [term, setTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [inputAutoFocused, setInputAutoFocused] = useState(false);
    const inputId = useId();
    const errorId = useId();
    const retryButtonHintId = useId();
    const inputRef = useRef(null);
    const resultItemRefs = useRef([]);
    const currentIndexRef = useRef(null);

const {matches, isLoading, isError, refetch } = useSearch(term, entity, { enabled: !!term });
const resultsToShow = useMemo(() =>  matches?.filter(match => !selectedValues.find(v => v.id === match.id)), [matches, selectedValues]);

    useEffect(() => {
     setShowResults(!!term);
    }, [term]);

    const onTermChange = (e) => setTerm(e.target.value);
    const onItemChoice = () => setShowResults(false);
    const onInputFocus = () => {
        if (term && matches?.length && !inputAutoFocused) {
            setShowResults(true);
        }
        setInputAutoFocused(false);
    }

    const querySearch = useDebounce(onTermChange, 200);
    const onDropdownExit = (e) => {
        if (e.key !== 'Escape') return;
        setShowResults(false);
        setInputAutoFocused(true);
    }

    const onArrowKeyNavigation = (e) => {
        let index = currentIndexRef.current;

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (index === null || index <= 0) index = resultItemRefs.current.length - 1;
            else index -= 1;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (index === null || index >= matches.length - 1) index = 0;
            else index += 1;
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            resultItemRefs.current[index]?.focus();
            currentIndexRef.current = index;
        }
    }
    const onResultItemHover = ({ currentTarget: {dataset: { id }}}) => {
        const refs = resultItemRefs.current;
        const index = resultItemRefs.current.findIndex(el => el.dataset.id === id);
        currentIndexRef.current = index;
        refs[index]?.focus();
    }

    const onResultItemSelect = (nameKey) => (e) => {
        e.preventDefault();
        const { id } = e.currentTarget.dataset;
        const index = resultItemRefs.current.findIndex(el => el.dataset.id === id);
        const newSelectedValues = [...selectedValues, { name: resultsToShow[index][nameKey], payload: resultsToShow[index], id: resultsToShow[index].id } ];
        onResultSelect?.(newSelectedValues, matches[index].id);
        resultItemRefs.current[index === 0 ? index + 1 : index - 1]?.focus();
    }

    const onSelectedItemRemove = (id) => (e) => {
        e.preventDefault();
        const draft = [...selectedValues];
        const idxToRemove = draft.findIndex(entity => entity.id === id);
        const [removedValue] = draft.splice(idxToRemove, 1);
        onResultRemove?.(draft, removedValue.payload.id);

    }

    const selectedItems = multiSelect && (
        <ul className={styles.selectedItems}>
            {selectedValues.map((value) =>  <li key={value.id} className={styles.selectedItem}>
                <Text iconAriaLabel={`Remove ${value.name}`} onIconClick={onSelectedItemRemove(value.id)} icon={faXmark} iconPosition='trailing'>{value.name}</Text>
            </li>)}
        </ul>
    );


    return (
        <OutsideEventBoundary onOutsideEvent={onItemChoice}>
            <div onKeyDown={onArrowKeyNavigation} className={clsx(wrapClassName, styles.wrapper)}>
                <Input
                    wrapClassName={inputWrapClassName}
                    aria-autocomplete="list"
                    {...(isError ? { ['aria-describedby']: errorId } : {})}
                    ref={inputRef}
                    autoFocus={inputAutoFocused}
                    id={inputId}
                    onFocus={onInputFocus}
                    onChange={querySearch}
                    type='search'
                    variant='filled'
                    label={label || 'search'}
                    slotAfterLabel={selectedItems}
                    {...props}
                />
                {
                    showResults &&
                    <Card role='alert' aria-controls={inputId} aria-expanded={showResults} className={styles.dropdown}>
                        <div className={styles.statusContainer}>
                            {isLoading && <Spinner aria-label='Loading your search' fontSize={4} aria-busy={isLoading}/>}
                            {
                                isError &&
                                <>
                                    <ErrorText aria-describedby={{...(isError? {['aria-describedby']: retryButtonHintId } : {}) }} fontSize={3} id={errorId}>Something went wrong while searching</ErrorText>
                                    <Button onClick={refetch} size='s'>Retry</Button>
                                    <span className={styles.retryHint} id={retryButtonHintId}>You can try again using the retry button below</span>
                                </>
                            }
                            {!isLoading && !isError && !resultsToShow?.length && <Text aria-hidden="true">No results</Text>}
                        </div>
                    <ul aria-label={matches && `${matches?.length} results found`}>
                        <>
                            {
                               resultsToShow?.map((match, i) => (
                                    <li
                                        aria-current={currentIndexRef.current === i}
                                        key={match.id}
                                        className={styles.resultItem} onKeyDown={onDropdownExit}
                                        onClick={!multiSelect ? onItemChoice : undefined}
                                    >
                                      <SearchResultFactory
                                          result={match}
                                          onResultItemHover={onResultItemHover}
                                          onResultItemSelect={onResultItemSelect}
                                          i={i}
                                          resultItemRefs={resultItemRefs.current} />
                                    </li>)
                                )
                            }
                        </>
                    </ul>
                    </Card>
                }
            </div>
        </OutsideEventBoundary>
    )
};
