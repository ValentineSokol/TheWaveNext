import React from "react";
import colors from '@/styles/_colors.module.scss';
import {Bar, BarChart, ResponsiveContainer, XAxis} from 'recharts';
import {useIntersectionObserver} from "@/utils/hooks/useIntersectionObserver";

export const TimeChart = () => {
    const data = [
        {date: new Date('06.01.2023').toDateString(), count: 20},
        {date: new Date().toDateString(), count: 10},
    ]
    return (
            <BarChart width={700} height={300} data={data}>
                <Bar isAnimationActive={true} label={{ position: 'center', fill: 'white' }} dataKey='count' fill={colors.primary} />
                <XAxis dataKey='date'/>
            </BarChart>
    )
}
