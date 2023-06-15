import React from 'react';
import { FormSearchInput } from '@/components/SearchInput/FormSearchInput/FormSearchInput';
import styles from '@/styles/PostStory.module.scss';
import { useRouter } from 'next/router';

export function CharactersStep({
  control, formState: { errors }, getValues, setValue,
}) {
  const { locale } = useRouter();
  const onCharacterSelect = (characters) => {
    const selectedCharacter = characters.at(-1);
    const { fandom } = selectedCharacter?.payload ?? {};
    const fandoms = getValues('fandoms');
    if (fandoms.find((f) => f.id === fandom.id)) return;
    setValue('fandoms', [...fandoms, { name: fandom[`name_${locale}`], id: fandom.id, payload: fandom }]);
  };
  const onFandomRemove = (fandoms, id) => {
    const characters = getValues('characters');
    setValue('characters', characters.filter((c) => c.payload.fandom.id !== id));
  };

  return (
    <div className={styles.inputs}>
      <FormSearchInput
        error={errors?.characters?.message}
        autoFocus
        fullWidth
        onResultItemSelect={onCharacterSelect}
        control={control}
        wrapClassName={styles.searchInputWrap}
        entity="character"
        label="Characters"
        name="characters"
      />
      <FormSearchInput
        error={errors?.fandoms?.message}
        onResultItemRemove={onFandomRemove}
        control={control}
        fullWidth
        wrapClassName={styles.searchInputWrap}
        entity="fandom"
        label="Fandoms"
        name="fandoms"
      />
    </div>
  );
}
