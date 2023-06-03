import React from 'react';
import {FormSearchInput} from "@/components/SearchInput/FormSearchInput/FormSearchInput";
import {Text} from "@/components/Text/Text";
import styles from '@/styles/PostStory.module.scss';
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import {useRouter} from "next/router";

export const CharactersStep = ({ control, getValues, setValue }) => {

    const { locale } = useRouter();
    const onCharacterSelect = (characters) => {
        const selectedCharacter = characters.at(-1);
        const { fandom } = selectedCharacter?.payload;
        const fandoms = getValues('fandoms');
        if (fandoms.find(f => f.id === fandom.id)) return;
        setValue('fandoms', [...fandoms, { name: fandom[`name_${locale}`], id: fandom.id, payload: fandom }  ]);
    };
    const onFandomRemove = (fandoms, id) => {
        const characters = getValues('characters');
        setValue('characters', characters.filter(c => c.payload.fandom.id !== id));
    }

    return (
        <div className={styles.inputs}>
            <FormSearchInput onResultItemSelect={onCharacterSelect} control={control} fullWidth wrapClassName={styles.searchInputWrap} entity='character'
                             label='Characters' name='characters'/>

            <Text icon={faCircleInfo}>Selecting a character automatically adds their fandom to the list.</Text>
            <FormSearchInput onResultItemRemove={onFandomRemove} control={control} fullWidth wrapClassName={styles.searchInputWrap} entity='fandom' label='Fandoms'
                             name='fandoms'/>
            <Text icon={faCircleInfo}>You can still add fandoms manually in cases when using only the fandom's world. Removing a fandom removes all its characters from the story.</Text>
        </div>
    );
};
