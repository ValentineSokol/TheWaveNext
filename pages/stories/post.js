import React, {useRef, useState} from 'react';
import {Heading} from "@/components/Heading/Heading";
import styles from '@/styles/PostStory.module.scss';
import {Card} from "@/components/Card/Card";
import {FormSearchInput} from "@/components/SearchInput/FormSearchInput/FormSearchInput";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons/faCircleInfo";

import {Text} from "@/components/Text/Text";
import {CharactersStep} from "@/pages/stories/PostStorySteps/CharactersStep";
import {SummaryStep} from "@/pages/stories/PostStorySteps/SummaryStep";
import {Button} from "@/components/Button/Button";

export default function PostStory(props) {

    const steps = [
        {heading: "What's your story about?", Step: SummaryStep},
        {heading: "Who and where are your heroes? Let's choose some characters and fandoms!", Step: CharactersStep}
    ];
    const [currentStepIdx, setCurrentStepIdx] = useState(1);

    const {heading, Step} = steps[currentStepIdx];

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


    const formAPI = useForm({
        mode: 'onBlur',
    });

    return (
        <main className={styles.main}>
            <Heading level={1} fontSize={6}>{heading}</Heading>
            <Card className={styles.card}>
                <form>
                    <Step {...formAPI} />
                </form>
                <div className={styles.stepBtns}>
                    <Button onClick={goToPrevStep}>Back</Button>
                    <Button onClick={goToNextStep}>Next</Button>
                </div>
            </Card>
        </main>
    );
}
