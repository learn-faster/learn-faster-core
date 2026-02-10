
import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const StabilityMap = ({ stabilityData }) => {
    // Generate data for Radar
    // In a real app, this would be grouped by high-level category
    const concepts = stabilityData?.at_risk_concepts || [];

    const data = {
        labels: concepts && concepts.length > 0 ? concepts.map(c => c.concept) : ['Pattern Rec', 'Semantic Net', 'Abstract Logic', 'Procedural', 'Factual'],
        datasets: [
            {
                label: 'Neural Stability',
                data: concepts && concepts.length > 0 ? concepts.map(c => c.stability) : [85, 92, 78, 88, 90],
                backgroundColor: 'rgba(194, 239, 179, 0.12)',
                borderColor: 'rgba(194, 239, 179, 0.55)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(220, 214, 247, 0.9)',
                pointBorderColor: 'rgba(17, 18, 26, 0.9)',
                pointHoverBackgroundColor: 'rgba(194, 239, 179, 0.95)',
                pointHoverBorderColor: 'rgba(194, 239, 179, 0.95)',
                pointRadius: 2,
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: { color: 'rgba(220, 214, 247, 0.12)' },
                grid: { color: 'rgba(220, 214, 247, 0.12)' },
                pointLabels: { color: 'rgba(220, 214, 247, 0.65)', font: { size: 10, weight: 'bold' } },
                ticks: { display: false, backdropColor: 'transparent' },
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        plugins: {
            legend: { display: false }
        },
        maintainAspectRatio: false
    };

    return (
        <div className="h-[250px] w-full mt-4">
            <Radar data={data} options={options} />
        </div>
    );
};

export default StabilityMap;
