import React, {useEffect, useState} from 'react';
import {Heading} from "@/components/Heading/Heading";
import styles from '@/styles/PostStory.module.scss';
import {Card} from "@/components/Card/Card";
import {useForm} from "react-hook-form";
import {SummaryStep} from "@/components/PostStorySteps/SummaryStep";
import {CharactersStep} from "@/components/PostStorySteps/CharactersStep";
import {ChapterStep} from "@/components/PostStorySteps/ChapterStep";
import {Button} from "@/components/Button/Button";
import {useCurrentUser} from "@/api/UserApi";
import Image from "next/image";
import mascot from '@/assets/mascot.png';
import {ProgressBar} from "@/components/ProgressBar/ProgressBar";
import {MetadataStep} from "@/components/PostStorySteps/MetadataStep";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";
import { postStorySchema } from "@/validators/postStory";
import { usePostStory } from "@/api/StoryApi";
import {yupResolver} from "@hookform/resolvers/yup";

export default function PostStory(props) {
    const {user, isLoading} = useCurrentUser();
    const { mutate } = usePostStory();
    const [currentStepIdx, setCurrentStepIdx] = useState(0);

    const formAPI = useForm({
        mode: 'onBlur',
        resolver: yupResolver(postStorySchema)
    });
    const steps = [
        {
            name: 'Summary',
            heading: `What's your new story about?`,
            Step: SummaryStep,
            fields: ['name', 'summary'],
            complete: formAPI.getValues()?.name?.length > 3 && formAPI.getValues()?.summary?.toHTML(),
        },
        {
            name: 'Characters',
            heading: "Who and where are your heroes?",
            fields: ['characters', 'fandoms'],
            Step: CharactersStep,
            complete: formAPI.getValues()?.characters?.length >= 1 && formAPI.getValues()?.fandoms?.length >= 1,
        },
        {
            name: 'Tags',
            heading: "I need to know just a tiny bit more...",
            Step: MetadataStep,
            fields: [],
            complete: false,
        },
        {
            name: 'Writing',
            heading: "Let's write your first chapter!",
            fields: ['chapter'],
            Step: ChapterStep,
            complete: formAPI.getValues('chapter')?.toHTML()
        },
    ];

    const {heading, Step} = steps[currentStepIdx];
    const onSubmit = (e) => {
        e.preventDefault();
        const formValues = formAPI.getValues();
        const payload = {};
        payload.characters = formValues.characters.map(ch => ch.id);
        payload.fandoms = formValues.fandoms.map(f => f.id);
        payload.name = formValues.name;
        payload.description = formValues.summary.toHTML();
        payload.chapter = { text: formValues.chapter.toHTML() };
        mutate(payload);
    }
    const goToNextStep = (e) => {
        e.preventDefault();
        if (currentStepIdx >= steps.length - 1) return;
        setCurrentStepIdx(currentStepIdx + 1);
    }

    const goToPrevStep = (e) => {
        e.preventDefault();
        if (currentStepIdx <= 0) return;
        setCurrentStepIdx(currentStepIdx - 1 || 0);
    }


    const goToStep = i => (e) => {
        e.preventDefault();
        setCurrentStepIdx(i);
    }

    const numCompletedSteps = steps.filter(step => step.complete).length;
    return (
        <main className={styles.main}>
            <div className={styles.conversation}>
                <Image aria-hidden='true' className={styles.mascot} src={mascot} alt="The Wave Mascot: A cute smiling dauphin"/>
                <div className={styles.speechBubble}>
                    <Heading level={1} fontSize={4}>{heading}</Heading>
                </div>
            </div>
            <Heading level={2} fontSize={3}>Go to:</Heading>
            <ul className={styles.stepNav}>
                {steps.map(
                    (step, i) => <li key={i}>
                        <Button
                            onClick={goToStep(i)}
                            variant='link_dark'
                            icon={!step.fields.every(f => !formAPI.formState.errors[f]) ? faTriangleExclamation : step.complete && faCheck}
                            size='s'
                        >
                            {step.name}
                        </Button>
                    </li>
                )}
            </ul>
            <ProgressBar className={styles.progressBar} label={`${numCompletedSteps} / ${steps.length}`}
                         percentage={100 * numCompletedSteps / (steps.length)}/>
            <Card className={styles.card}>
                <form>
                    <Step {...formAPI} />
                </form>
                <div className={styles.stepBtns}>
                    <Button disabled={currentStepIdx === 0} variant='outline' onClick={goToPrevStep}>Back</Button>
                    <Button disabled={currentStepIdx === steps.length - 1 && !steps.every(s => s.complete)} onClick={currentStepIdx === steps.length - 1 ? onSubmit : goToNextStep}>{ currentStepIdx === steps.length - 1 ? 'Submit' : 'Next' }</Button>
                </div>
            </Card>
        </main>
    );
}
