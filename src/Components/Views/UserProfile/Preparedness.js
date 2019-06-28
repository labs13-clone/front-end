import React, {useEffect, useState} from 'react';

export default function Preparedness(props) {

    const categoryStats = props
        .auth
        .user
        .categories
        .map(cat => ({
            name: cat.name,
            challengeCompleted: cat.userChallengesCompleted * 100 / cat.totalPossibleChallenges,
            experienceCompleted: cat.userXpEarned * 100 / cat.totalPossibleXp,
            total: cat.totalXpEarned
        }));

    return (
        <div className="tabs-right-side preparedness-tab">
            <div className="preparedness-table">
                <div className="preparedness-row preparedness-header">
                    <span className="preparedness-column preparedness-column-big">Category</span>
                    <span className="preparedness-column preparedness-column-small">Percent Challenges Completed</span>
                    <span className="preparedness-column preparedness-column-small">Percent Experience Obtained</span>
                </div>
                <div className="preparedness-body">
                    {categoryStats.map(data => <div className="preparedness-row">
                        <span className="preparedness-column preparedness-column-big">{data.name}</span>
                        <span className="preparedness-column preparedness-column-small">{parseInt(data.challengeCompleted, 10)}%</span>
                        <span className="preparedness-column preparedness-column-small">{parseInt(data.experienceCompleted, 10)}%</span>
                    </div>)
}
                </div>
            </div>
        </div>
    )
}
